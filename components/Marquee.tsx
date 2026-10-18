"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GUMBALL_COLORS } from "@/lib/site";
import { Gumball } from "./ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORDS = ["Real glass", "Cast metal", "Coin bank", "Free spin", "Holds 5 lbs", "Gift-ready", "Pure joy"];

export default function Marquee({ tilt = -2, tone = "ink" }: { tilt?: number; tone?: "ink" | "cherry" }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(".marquee-track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        // Scroll velocity speeds up the ticker and flips its direction.
        let dir = 1;
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            if (Math.abs(v) < 5) return;
            dir = v > 0 ? 1 : -1;
            gsap.to(loop, {
              timeScale: dir * gsap.utils.clamp(1, 5, Math.abs(v) / 300),
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(loop, { timeScale: dir, duration: 1.2, ease: "power2.out" });
              },
            });
          },
        });
        gsap.to(".marquee-track .gb", { rotation: 360, duration: 4, repeat: -1, ease: "none" });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const row = WORDS.map((w, i) => (
    <span className="marquee-item" key={i}>
      {w}
      <Gumball color={GUMBALL_COLORS[i % GUMBALL_COLORS.length]} size={30} />
    </span>
  ));

  return (
    <div ref={ref} className={`marquee marquee-${tone}`} style={{ rotate: `${tilt}deg` }} aria-hidden>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
