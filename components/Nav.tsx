"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BRAND } from "@/lib/site";
import { Gumball, WaButton } from "./ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".nav-inner", { yPercent: -180, duration: 1, ease: "expo.out", delay: 0.9 });

      // Hide on scroll down, show on scroll up.
      ScrollTrigger.create({
        start: "top top-=160",
        end: "max",
        onUpdate: (self) => ref.current?.classList.toggle("nav-hidden", self.direction === 1),
        onLeaveBack: () => ref.current?.classList.remove("nav-hidden"),
      });
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className="nav">
      <div className="nav-inner">
        <a href="#top" className="logo" aria-label={`${BRAND} home`}>
          <Gumball color="#E8262B" size={22} />
          <span>{BRAND}</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#play">Play</a>
          <a href="#details">Details</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <WaButton className="btn-sm">Order now</WaButton>
      </div>
    </header>
  );
}
