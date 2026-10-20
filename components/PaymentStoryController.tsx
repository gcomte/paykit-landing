"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./PaymentStory.module.css";

const PLAYBACK_RATE = 0.8;

type Step = { label: ReactNode; title: ReactNode; description: ReactNode };
type Props = {
  children: ReactNode;
  footer: ReactNode;
  steps: Step[];
  labels: {
    play: string;
    pause: string;
    navigation: string;
    reducedMotion: string;
    autoplay: string;
    paused: string;
    manual: string;
  };
};

export default function PaymentStoryController({
  children,
  footer,
  steps,
  labels,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const titleId = useId();
  const [active, setActive] = useState(0);
  const [requestedPlay, setRequestedPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [manualStep, setManualStep] = useState(false);
  const elapsed = useRef(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualAnnouncement, setManualAnnouncement] = useState<ReactNode>(null);
  const playing = requestedPlay && inView && pageVisible && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      setRequestedPlay(!preference.matches);
      setManualStep(false);
      if (preference.matches) {
        setActive(steps.length - 1);
        elapsed.current = 0;
        setProgress(0);
      }
    };
    updatePreference();
    const updateVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.2),
      { threshold: 0.2 },
    );
    if (root.current) {
      observer.observe(
        root.current.querySelector('[data-testid="payment-scene"]') ||
          root.current,
      );
    }
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [steps.length]);

  useEffect(() => {
    if (!playing) return;
    const duration =
      (active === 0 ? 8000 : active === steps.length - 1 ? 12000 : 10000) /
      PLAYBACK_RATE;
    let lastTick = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsed.current += now - lastTick;
      lastTick = now;
      if (elapsed.current >= duration) {
        elapsed.current = 0;
        setProgress(0);
        setActive((step) => (step + 1) % steps.length);
        window.clearInterval(timer);
      } else {
        setProgress((elapsed.current / duration) * 100);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, active, steps.length]);

  function select(index: number) {
    setActive(index);
    setManualStep(true);
    setRequestedPlay(false);
    elapsed.current = 0;
    setProgress(0);
    setManualAnnouncement(
      <>
        {steps[index].title} {steps[index].description}
      </>,
    );
  }
  function toggle() {
    if (!requestedPlay) setManualStep(false);
    setRequestedPlay(!requestedPlay);
  }
  return (
    <figure
      ref={root}
      className={styles.story}
      aria-labelledby={titleId}
      data-testid="payment-story"
      data-active-step={active}
      data-step-halfway={manualStep || progress >= 50}
      data-manual-step={manualStep}
      data-playing={playing}
      data-in-view={inView}
      data-page-visible={pageVisible}
      data-reduced-motion={reducedMotion}
      style={{ "--story-progress": `${progress}%` } as CSSProperties}
    >
      <div className={styles.illustration} data-testid="payment-illustration">
        <div className={styles.heading} data-testid="payment-story-heading">
          <h3 id={titleId}>{steps[active].title}</h3>
          <div className={styles.progressTrack} aria-hidden="true">
            <span className={styles.progressFill} />
          </div>
        </div>
        {children}
      </div>
      <figcaption
        className={styles.caption}
        data-testid="payment-story-caption"
      >
        {steps.map((step, index) => (
          <p key={index} hidden={index !== active}>
            {step.description}
          </p>
        ))}
      </figcaption>
      <div className={styles.controls}>
        <nav className={styles.steps} aria-label={labels.navigation}>
          {steps.map((step, index) => (
            <button
              type="button"
              key={index}
              data-step={index}
              aria-current={active === index ? "step" : undefined}
              onClick={() => select(index)}
            >
              <span className={styles.stepNumber} aria-hidden="true">
                {index}
              </span>
              <span>{step.label}</span>
            </button>
          ))}
        </nav>
        <div className={styles.playback}>
          <span className={styles.playbackStatus}>
            {reducedMotion
              ? labels.manual
              : playing
                ? labels.autoplay
                : labels.paused}
          </span>
          <button
            type="button"
            onClick={toggle}
            disabled={reducedMotion}
            aria-label={requestedPlay ? labels.pause : labels.play}
            data-testid="payment-story-toggle"
          >
            {requestedPlay ? (
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M7 5v10M13 5v10" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7 4 9 6-9 6Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {reducedMotion && (
        <p className={styles.motionNote}>{labels.reducedMotion}</p>
      )}
      {footer}
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {manualAnnouncement}
      </div>
    </figure>
  );
}
