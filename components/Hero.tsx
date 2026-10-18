"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { GUMBALL_COLORS, PLANS, rand } from "@/lib/site";
import { Gumball, WaButton } from "./ui";

gsap.registerPlugin(useGSAP, SplitText, Draggable, InertiaPlugin);

// x / y in % of the hero stage, size in px
const BALLS = [
  { x: 6, y: 18, s: 64, c: 0 },
  { x: 16, y: 72, s: 44, c: 2 },
  { x: 42, y: 8, s: 34, c: 4 },
  { x: 88, y: 14, s: 52, c: 1 },
  { x: 93, y: 58, s: 74, c: 5 },
  { x: 70, y: 86, s: 40, c: 3 },
  { x: 54, y: 62, s: 28, c: 6 },
  { x: 30, y: 90, s: 56, c: 4 },
  { x: 78, y: 40, s: 30, c: 2 },
  { x: 2, y: 48, s: 30, c: 6 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      const balls = gsap.utils.toArray<HTMLElement>(".hero-ball");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-title", { type: "chars,words", mask: "words" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.from(".hero-machine", { yPercent: -140, rotation: -10, duration: 1.4, ease: "bounce.out" })
          .from(split.chars, { yPercent: 110, rotation: 8, stagger: 0.022, duration: 1 }, 0.25)
          .from(".hero-sub, .hero-ctas, .hero-meta", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1 }, 0.7)
          .from(balls, { scale: 0, duration: 1, stagger: 0.06, ease: "back.out(3)" }, 0.9)
          .from(".hero-sticker", { scale: 0, rotation: -120, duration: 1.2, ease: "elastic.out(1, 0.5)" }, 1.1)
          .from(".hero-shadow", { scaleX: 0.2, autoAlpha: 0, duration: 1.2 }, 0.2);

        // Lazy floating, on the inner element so dragging stays independent.
        gsap.utils.toArray<HTMLElement>(".hero-ball .gb").forEach((el, i) => {
          gsap.to(el, {
            y: gsap.utils.random(-22, 22),
            x: gsap.utils.random(-12, 12),
            rotation: gsap.utils.random(-40, 40),
            duration: gsap.utils.random(2.4, 4),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.15,
          });
        });

        gsap.to(".hero-sticker-ring", { rotation: 360, duration: 18, repeat: -1, ease: "none" });

        // Mouse parallax
        const mx = gsap.quickTo(".hero-machine-tilt", "rotationY", { duration: 0.8, ease: "power3" });
        const my = gsap.quickTo(".hero-machine-tilt", "rotationX", { duration: 0.8, ease: "power3" });
        const lx = gsap.quickTo(".hero-balls", "x", { duration: 1.2, ease: "power3" });
        const ly = gsap.quickTo(".hero-balls", "y", { duration: 1.2, ease: "power3" });

        const onMove = contextSafe!((e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          mx(nx * 16);
          my(-ny * 10);
          lx(nx * -40);
          ly(ny * -30);
        });
        window.addEventListener("pointermove", onMove);

        // Scroll away: machine sinks and balls drift up.
        gsap.to(".hero-stage", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => window.removeEventListener("pointermove", onMove);
      });

      // Flickable gumballs — works with or without motion preference.
      Draggable.create(balls, {
        type: "x,y",
        inertia: true,
        bounds: root.current,
        edgeResistance: 0.65,
        onPress() {
          gsap.to(this.target, { scale: 1.25, duration: 0.25, ease: "back.out(3)" });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        },
      });

      // Squishy machine on click
      const squish = contextSafe!(() => {
        gsap
          .timeline()
          .to(".hero-machine", { scaleY: 0.9, scaleX: 1.06, duration: 0.12, ease: "power2.out" })
          .to(".hero-machine", { scaleY: 1, scaleX: 1, duration: 0.9, ease: "elastic.out(1.2, 0.3)" });
      });
      root.current?.querySelector(".hero-machine")?.addEventListener("click", squish);

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="hero">
      <div className="hero-bg" aria-hidden>
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow">
          <span className="dot" /> The 11&quot; Classic · Now in South Africa
        </p>
        <h1 className="hero-title">
          Joy, one <em>turn</em> at a time.
        </h1>
        <p className="hero-sub">
          A real-glass, cast-metal gumball machine with a secret coin bank inside. Built like an
          heirloom, made for grinning.
        </p>
        <div className="hero-ctas">
          <WaButton>Order on WhatsApp</WaButton>
          <a href="#how" className="btn btn-ghost">
            See it spin <span aria-hidden>↓</span>
          </a>
        </div>
        <ul className="hero-meta">
          <li>
            <strong>Real glass</strong> globe
          </li>
          <li>
            <strong>Holds 5 lbs</strong> of candy
          </li>
          <li>
            <strong>Nationwide</strong> delivery
          </li>
        </ul>
      </div>

      <div className="hero-stage">
        <div className="hero-balls" aria-hidden>
          {BALLS.map((b, i) => (
            <span
              key={i}
              className="hero-ball"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              title="Flick me!"
            >
              <Gumball color={GUMBALL_COLORS[b.c]} size={b.s} />
            </span>
          ))}
        </div>

        <div className="hero-machine-wrap">
          <span className="hero-shadow" aria-hidden />
          <div className="hero-machine-tilt">
            <div className="hero-machine" role="img" aria-label="Red 11 inch gumball machine full of colourful gumballs">
              <Image
                src="/images/machine.png"
                alt=""
                width={679}
                height={1355}
                priority
                sizes="(max-width: 900px) 60vw, 380px"
              />
            </div>
          </div>
        </div>

        <div className="hero-sticker" aria-label={`From ${rand(PLANS[0].price)}`}>
          <svg className="hero-sticker-ring" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#ring" startOffset="0">
                REAL GLASS • FREE SPIN • COIN BANK • CAST METAL •
              </textPath>
            </text>
          </svg>
          <span className="hero-sticker-price">
            <small>from</small>
            {rand(PLANS[0].price)}
          </span>
        </div>

        <p className="hero-hint" aria-hidden>
          psst — flick the gumballs ↘
        </p>
      </div>
    </section>
  );
}
