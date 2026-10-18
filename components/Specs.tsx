import Image from "next/image";

const SPECS: [string, string][] = [
  ["Colour", "Classic cherry red"],
  ["Materials", "Glass, aluminium alloy, cast iron"],
  ["Includes", "Gumball machine & coin bank"],
  ["Capacity", "Up to 5 lbs (≈2.2kg) of candy"],
  ["Fits", 'Gumballs or hard candy 0.7" (18mm) or smaller'],
  ["Coin mechanism", "Takes small coins — or use free spin"],
  ["Size", '11" tall × 5" wide (28 × 13cm)'],
  ["Weight", "3.1 lbs (≈1.4kg)"],
];

export default function Specs() {
  return (
    <section id="details" className="specs section">
      <div className="specs-visual" data-reveal>
        <div className="specs-figure">
          <Image src="/images/machine.png" alt="Gumball machine dimensions" width={679} height={1355} sizes="(max-width: 900px) 50vw, 300px" />
          <span className="dim dim-h" aria-hidden>
            <span>11&quot;</span>
          </span>
          <span className="dim dim-w" aria-hidden>
            <span>5&quot;</span>
          </span>
        </div>
      </div>
      <div className="specs-copy">
        <p className="eyebrow" data-reveal>
          The details
        </p>
        <h2 className="h2" data-reveal>
          Built like a <em>keepsake.</em>
        </h2>
        <dl className="spec-list">
          {SPECS.map(([k, v]) => (
            <div className="spec-row" key={k} data-reveal>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
