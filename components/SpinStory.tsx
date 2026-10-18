"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Gumball } from "./ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Pop in a coin.",
    body: "Drop a coin in the slot and it tumbles into the hidden bank. Saving up has never been this sweet.",
  },
  {
    n: "02",
    title: "Give it a twist.",
    body: "A satisfying, weighty turn of the cast-metal crank. Click… clunk… here it comes.",
  },
  {
    n: "03",
    title: "Catch the joy.",
    body: "One perfect gumball rolls into the chute. Repeat until grinning. Or flip to free spin and skip the coin.",
  },
];

export default function SpinStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".story-step");
        gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 });
        gsap.set(".story-coin", { y: -260, autoAlpha: 0 });
        gsap.set(".story-ball", { scale: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: ".story-pin",
            scrub: 0.8,
          },
        });

        tl.to(".story-progress-bar", { scaleX: 1, ease: "none", duration: 3 }, 0)
          // 1 — coin drops into slot
          .to(".story-coin", { autoAlpha: 1, duration: 0.1 }, 0.1)
          .to(".story-coin", { y: 0, rotationX: 720, duration: 0.6, ease: "power2.in" }, 0.1)
          .to(".story-coin", { scale: 0.2, autoAlpha: 0, duration: 0.2 }, 0.72)
          .to(".story-machine", { y: 6, duration: 0.08, yoyo: true, repeat: 1 }, 0.7)
          // 2 — crank
          .to(steps[0], { autoAlpha: 0, y: -40, duration: 0.25 }, 0.9)
          .to(steps[1], { autoAlpha: 1, y: 0, duration: 0.25 }, 1.05)
          .fromTo(".story-crank", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.2 }, 1.05)
          .to(".story-crank-spin", { rotation: 360, duration: 0.7, ease: "power1.inOut" }, 1.2)
          .to(".story-machine", { rotation: 1.5, duration: 0.1, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.2)
          .to(".story-crank", { autoAlpha: 0, duration: 0.15 }, 1.9)
          // 3 — gumball rolls out and pops toward you
          .to(steps[1], { autoAlpha: 0, y: -40, duration: 0.25 }, 1.95)
          .to(steps[2], { autoAlpha: 1, y: 0, duration: 0.25 }, 2.1)
          .to(".story-ball", { scale: 1, duration: 0.25, ease: "back.out(3)" }, 2.0)
          .to(".story-ball", { x: "-14vw", duration: 0.75, ease: "none" }, 2.25)
          .to(".story-ball", { y: "8vh", duration: 0.75, ease: "bounce.out" }, 2.25)
          .to(".story-ball .gb", { rotation: -540, duration: 0.75, ease: "none" }, 2.25)
          .to(".story-ball", { scale: 3.2, duration: 0.5 }, 2.5);

        steps.forEach((s, i) => {
          tl.to(`.story-dot:nth-child(${i + 1})`, { backgroundColor: "var(--cherry)", scale: 1.3, duration: 0.1 }, i === 0 ? 0 : i + 0.05);
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="how" ref={root} className="story">
      <div className="story-pin">
        <div className="story-copy">
          <p className="eyebrow">How it works</p>
          <div className="story-steps">
            {STEPS.map((s) => (
              <article className="story-step" key={s.n}>
                <span className="story-n">{s.n}</span>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
          <div className="story-progress" aria-hidden>
            <span className="story-progress-bar" />
          </div>
          <div className="story-dots" aria-hidden>
            <span className="story-dot" />
            <span className="story-dot" />
            <span className="story-dot" />
          </div>
        </div>

        <div className="story-visual">
          <div className="story-disc" aria-hidden />
          <div className="story-machine">
            <Image src="/images/machine.png" alt="The gumball machine" width={679} height={1355} sizes="(max-width: 900px) 70vw, 34vh" />
            {/* overlay coordinates are % of the product photo */}
            <span className="story-coin" aria-hidden>
              <span>R</span>
            </span>
            <span className="story-crank" aria-hidden>
              <svg className="story-crank-spin" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="16 10" strokeLinecap="round" />
                <path d="M50 2 l9 6 -9 6z" fill="currentColor" />
              </svg>
            </span>
            <span className="story-ball" aria-hidden>
              <Gumball color="#FF6FB5" size={34} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
