"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./PaymentStory.module.css";

type Step = { label: ReactNode; title: ReactNode; description: ReactNode };
type Props = {
  children: ReactNode;
  heading: ReactNode;
  footer: ReactNode;
  steps: Step[];
  labels: {
    play: string;
    pause: string;
    replay: string;
    navigation: string;
    reducedMotion: string;
  };
};

export default function PaymentStoryController({
  children,
  heading,
  footer,
  steps,
  labels,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [requestedPlay, setRequestedPlay] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualAnnouncement, setManualAnnouncement] = useState<ReactNode>(null);
  const playing = requestedPlay && inView && pageVisible && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      setCompleted(false);
      setRequestedPlay(!preference.matches);
      if (preference.matches) setActive(steps.length - 1);
    };
    updatePreference();
    const updateVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.25),
      { threshold: 0.25 },
    );
    if (root.current) observer.observe(root.current);
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
    const timer = window.setTimeout(() => {
      if (active >= steps.length - 1) {
        setRequestedPlay(false);
        setCompleted(true);
      } else setActive(active + 1);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [playing, active, steps.length]);

  function select(index: number) {
    setActive(index);
    setRequestedPlay(false);
    setCompleted(false);
    setManualAnnouncement(steps[index].description);
  }
  function replay() {
    setActive(0);
    setCompleted(false);
    setRequestedPlay(!reducedMotion);
    setManualAnnouncement(steps[0].description);
  }
  function toggle() {
    if (completed) replay();
    else setRequestedPlay(!requestedPlay);
  }
  return (
    <figure
      ref={root}
      className={styles.story}
      data-testid="payment-story"
      data-active-step={active}
      data-playing={playing}
      data-in-view={inView}
      data-page-visible={pageVisible}
      data-reduced-motion={reducedMotion}
    >
      <div className={styles.heading}>{heading}</div>
      {children}
      <div className={styles.caption} data-testid="payment-story-caption">
        {steps.map((step, index) => (
          <div key={index} hidden={index !== active}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
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
          <button
            type="button"
            onClick={replay}
            aria-label={labels.replay}
            data-testid="payment-story-replay"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 8a6.5 6.5 0 1 1 0 5M4 3v5h5" />
            </svg>
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
