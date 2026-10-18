const MOMENTS = [
  { title: "The desk flex", body: "Instantly the most popular desk in the office.", color: "#FF6FB5" },
  { title: "The kids' bank", body: "Pocket money goes in, good habits come out.", color: "#FFD23F" },
  { title: "The party piece", body: "Fill it with mints for weddings, sweets for birthdays.", color: "#2BD98F" },
  { title: "The perfect gift", body: "For the person who has everything — except this.", color: "#3D8BFF" },
];

export default function Moments() {
  return (
    <section className="moments section">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Made for</p>
        <h2 className="h2">
          Every room needs <em>a little joy.</em>
        </h2>
      </div>
      <div className="moments-grid">
        {MOMENTS.map((m, i) => (
          <article key={m.title} className="moment" style={{ ["--accent" as string]: m.color }} data-reveal>
            <span className="moment-n">0{i + 1}</span>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
