import { GUMBALL_COLORS, PLANS, REFILL, rand } from "@/lib/site";
import { Gumball, WaButton } from "./ui";

export default function Pricing() {
  return (
    <section id="pricing" className="pricing section">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Pricing</p>
        <h2 className="h2">
          Pick your <em>sweet spot.</em>
        </h2>
        <p className="lead">Launch prices. Order on WhatsApp, pay by EFT, delivered to your door anywhere in SA.</p>
      </div>

      <div className="plans">
        {PLANS.map((p, i) => (
          <article key={p.id} className={`plan ${p.featured ? "plan-featured" : ""}`} data-reveal data-tilt>
            {p.featured && <span className="plan-badge">Most loved</span>}
            <div className="plan-balls" aria-hidden>
              {Array.from({ length: i + 1 }).map((_, j) => (
                <Gumball key={j} color={GUMBALL_COLORS[(i * 2 + j) % GUMBALL_COLORS.length]} size={26} />
              ))}
            </div>
            <h3>{p.name}</h3>
            <p className="plan-tag">{p.tagline}</p>
            <p className="plan-price">
              <span className="plan-amount">{rand(p.price)}</span>
              {p.compareAt && <s>{rand(p.compareAt)}</s>}
            </p>
            <ul>
              {p.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <WaButton message={p.message} variant={p.featured ? "light" : "primary"}>
              Order {p.name.replace("The ", "")}
            </WaButton>
          </article>
        ))}
      </div>

      <div className="refill" data-reveal>
        <div className="refill-balls" aria-hidden>
          {GUMBALL_COLORS.map((c) => (
            <Gumball key={c} color={c} size={28} />
          ))}
        </div>
        <p>
          <strong>Running low?</strong> {REFILL.name} — {rand(REFILL.price)}
        </p>
        <WaButton message={REFILL.message} variant="ghost" className="btn-sm">
          Add a refill
        </WaButton>
      </div>
    </section>
  );
}
