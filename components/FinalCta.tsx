"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { BRAND, GUMBALL_COLORS, WHATSAPP_DISPLAY } from "@/lib/site";
import { Gumball, WaButton } from "./ui";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const RAIN = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37) % 100,
  s: 24 + ((i * 13) % 46),
  c: GUMBALL_COLORS[i % GUMBALL_COLORS.length],
}));

export default function FinalCta() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".cta-title", { type: "words,chars", mask: "words" });
        const h = root.current!.offsetHeight;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
        tl.from(split.chars, { yPercent: 110, stagger: 0.018, duration: 0.9, ease: "expo.out" }).fromTo(
          ".rain-ball",
          { y: () => -gsap.utils.random(100, 600) },
          {
            y: (i, el: HTMLElement) => h - el.offsetHeight - gsap.utils.random(0, 30),
            rotation: () => gsap.utils.random(-360, 360),
            duration: () => gsap.utils.random(1.1, 1.8),
            ease: "bounce.out",
            stagger: 0.04,
          },
          0
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="cta">
      <div className="cta-inner" ref={root}>
        <div className="cta-rain" aria-hidden>
          {RAIN.map((b, i) => (
            <span key={i} className="rain-ball" style={{ left: `${b.x}%` }}>
              <Gumball color={b.c} size={b.s} />
            </span>
          ))}
        </div>
        <h2 className="cta-title">
          Turn a little. <em>Smile a lot.</em>
        </h2>
        <p className="lead">One message and your {BRAND} machine is on its way.</p>
        <WaButton variant="light">Order on WhatsApp · {WHATSAPP_DISPLAY}</WaButton>
      </div>
    </section>
  );
}
