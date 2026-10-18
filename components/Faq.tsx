import { WHATSAPP_DISPLAY } from "@/lib/site";

const FAQS = [
  {
    q: "How do I order?",
    a: `Tap any WhatsApp button (or message ${WHATSAPP_DISPLAY}). Tell us which bundle you'd like and your delivery address, and we'll confirm stock, delivery cost and EFT details.`,
  },
  {
    q: "Do you deliver nationwide?",
    a: "Yes — we courier anywhere in South Africa, usually within 2–5 working days. Delivery is quoted on WhatsApp based on your area.",
  },
  {
    q: "Does it take South African coins?",
    a: "The mechanism is designed for small coins up to about 24mm, so smaller rand coins generally work. Bigger coins won't fit — but you can always flip to free-spin mode and dispense without any coin at all.",
  },
  {
    q: "What candy can I put in it?",
    a: 'Gumballs or round hard candy 0.7" (18mm) or smaller. Think mini gumballs, jelly beans, chocolate-coated peanuts or mints. It holds up to about 2.2kg.',
  },
  {
    q: "Is the globe really glass?",
    a: "It is. A real glass globe on a cast-metal (aluminium alloy and cast iron) base. Wipe it clean with a soft, damp cloth.",
  },
  {
    q: "Can I gift-wrap it?",
    a: "Absolutely. The Sweet Start and Double Spin bundles come gift-ready, and we'll happily add a handwritten note — just ask on WhatsApp.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="faq section">
      <div className="section-head" data-reveal>
        <p className="eyebrow">FAQ</p>
        <h2 className="h2">
          Questions? <em>We&apos;ve got answers.</em>
        </h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f) => (
          <details key={f.q} className="faq-item" data-reveal>
            <summary>
              {f.q}
              <span className="faq-plus" aria-hidden />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
