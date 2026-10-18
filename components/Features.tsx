import { Gumball } from "./ui";

const FEATURES = [
  {
    title: "Real glass globe",
    body: "Crystal-clear glass shows off every colour. No cloudy plastic, ever.",
    color: "#3D8BFF",
    span: "wide",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="22" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M15 16a10 10 0 0 1 8-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        <rect x="14" y="38" width="20" height="6" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Cast-metal build",
    body: "Aluminium alloy and cast iron. It has heft — the good kind.",
    color: "#E8262B",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path d="M8 34 24 8l16 26Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M6 40h36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Secret coin bank",
    body: "Every coin is saved inside. Teach the kids to save. Or don't. We won't tell.",
    color: "#FFD23F",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <ellipse cx="24" cy="30" rx="15" ry="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="24" cy="22" rx="15" ry="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 4v10M19 9h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Free-spin mode",
    body: "Flip a switch and it dispenses without coins. Party mode: on.",
    color: "#2BD98F",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path d="M38 24a14 14 0 1 1-4.1-9.9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M36 6v9h-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Holds 5 lbs of candy",
    body: "That's roughly 2.2kg of happiness. Gumballs or hard candy up to 0.7\" (18mm).",
    color: "#8A4DFF",
    span: "wide",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <circle cx="16" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="features section">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Why you&apos;ll love it</p>
        <h2 className="h2">
          Small machine. <em>Big personality.</em>
        </h2>
      </div>
      <div className="bento">
        {FEATURES.map((f, i) => (
          <article
            key={f.title}
            className={`card ${f.span === "wide" ? "card-wide" : ""}`}
            style={{ ["--accent" as string]: f.color }}
            data-reveal
            data-tilt
          >
            <span className="card-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
            <Gumball color={f.color} size={i % 2 ? 90 : 120} className="card-ball" />
          </article>
        ))}
      </div>
    </section>
  );
}
