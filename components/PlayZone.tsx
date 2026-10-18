"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GUMBALL_COLORS } from "@/lib/site";

gsap.registerPlugin(useGSAP);

const FLAVOURS = ["Cherry!", "Bubblegum!", "Lemon!", "Green apple!", "Blueberry!", "Grape!", "Tangerine!", "Vanilla!"];
const SIZE = 46;

export default function PlayZone() {
  const root = useRef<HTMLElement>(null);
  const tray = useRef<HTMLDivElement>(null);
  const heights = useRef<number[]>([]);
  const [count, setCount] = useState(0);
  const [flavour, setFlavour] = useState("Turn the crank");
  const [full, setFull] = useState(false);

  const { contextSafe } = useGSAP({ scope: root });

  const spin = contextSafe(() => {
    const el = tray.current;
    if (!el || full) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const cols = Math.max(1, Math.floor(w / SIZE));
    const rows = Math.floor(h / (SIZE * 0.86)) - 1;
    if (heights.current.length !== cols) heights.current = Array(cols).fill(0);

    // Prefer low columns so the pile looks natural.
    const min = Math.min(...heights.current);
    if (min >= rows) {
      setFull(true);
      return;
    }
    const candidates = heights.current
      .map((v, i) => ({ v, i }))
      .filter(({ v }) => v <= min + 1 && v < rows);
    const { i: col } = candidates[Math.floor(Math.random() * candidates.length)];
    const level = heights.current[col]++;
    const offset = level % 2 ? SIZE / 2 : 0;
    const x = Math.min(w - SIZE, col * (w / cols) + offset * 0.5 + gsap.utils.random(-3, 3));
    const y = h - SIZE - level * SIZE * 0.86;

    const ci = Math.floor(Math.random() * GUMBALL_COLORS.length);
    const ball = document.createElement("span");
    ball.className = "gb play-ball";
    ball.style.setProperty("--c", GUMBALL_COLORS[ci]);
    ball.style.width = ball.style.height = `${SIZE}px`;
    el.appendChild(ball);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(ball, { x: w / 2 - SIZE / 2, y: -SIZE * 1.5 });
    gsap
      .timeline()
      .to(ball, { x, duration: reduce ? 0 : 0.9, ease: "power1.out" }, 0)
      .to(ball, { y, duration: reduce ? 0 : 0.9, ease: "bounce.out" }, 0)
      .to(ball, { rotation: gsap.utils.random(-360, 360), duration: 0.9, ease: "power2.out" }, 0);

    gsap.fromTo(".play-crank-knob", { rotation: 0 }, { rotation: 360, duration: 0.6, ease: "back.out(1.6)" });
    gsap.fromTo(".play-flavour", { scale: 0.6, rotation: -6 }, { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    gsap.fromTo(".play-count", { y: -10 }, { y: 0, duration: 0.4, ease: "back.out(3)" });

    setCount((c) => c + 1);
    setFlavour(FLAVOURS[ci]);
  });

  const reset = contextSafe(() => {
    const balls = tray.current?.querySelectorAll(".play-ball");
    if (!balls?.length) return;
    gsap.to(balls, {
      y: "-=420",
      x: () => `+=${gsap.utils.random(-300, 300)}`,
      rotation: () => gsap.utils.random(-720, 720),
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.004,
      onComplete: () => balls.forEach((b) => b.remove()),
    });
    heights.current = [];
    setFull(false);
    setFlavour("Fresh tray. Go again!");
  });

  return (
    <section id="play" ref={root} className="play section">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Interactive demo</p>
        <h2 className="h2">
          Go on, <em>give it a spin.</em>
        </h2>
        <p className="lead">Fair warning: it&apos;s just as addictive in real life.</p>
      </div>

      <div className="play-box" data-reveal>
        <div className="play-panel">
          <p className="play-flavour" aria-live="polite">
            {flavour}
          </p>
          <p className="play-count">
            <strong>{count}</strong> gumball{count === 1 ? "" : "s"} dispensed
          </p>
          <button className="play-crank" onClick={full ? reset : spin}>
            <span className="play-crank-knob" aria-hidden>
              <span />
            </span>
            {full ? "Tray's full — empty it!" : "Turn the crank"}
          </button>
          {count > 0 && !full && (
            <button className="play-reset" onClick={reset}>
              Empty the tray
            </button>
          )}
        </div>
        <div className="play-tray" ref={tray}>
          <span className="play-chute" aria-hidden />
        </div>
      </div>
    </section>
  );
}
