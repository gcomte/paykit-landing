import Image from "next/image";

export default function PaymentIllustration() {
  return (
    <figure className="payment-illustration">
      <Image
        src="/illustrations/contact-payment-v1.png"
        alt="Conceptual illustration of a wallet exchanging payment details with a contact through an orange connection."
        width={1774}
        height={887}
        sizes="(max-width: 600px) 100vw, 1152px"
      />
      <figcaption>
        <span>Your wallet</span>
        <span>Details handled by Paykit</span>
        <span>Your contact</span>
      </figcaption>
    </figure>
  );
}
