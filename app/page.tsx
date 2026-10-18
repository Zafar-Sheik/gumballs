import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SpinStory from "@/components/SpinStory";
import PlayZone from "@/components/PlayZone";
import Features from "@/components/Features";
import Specs from "@/components/Specs";
import Moments from "@/components/Moments";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Motion from "@/components/Motion";
import { Gumball, WhatsAppIcon } from "@/components/ui";
import { BRAND, DEFAULT_ORDER_MESSAGE, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <SpinStory />
        <Features />
        <PlayZone />
        <Specs />
        <Marquee tilt={2} tone="cherry" />
        <Moments />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <footer className="footer">
        <a href="#top" className="logo">
          <Gumball color="#E8262B" size={22} />
          <span>{BRAND}</span>
        </a>
        <p>Joy, one turn at a time. Delivered across South Africa.</p>
        <a href={whatsappLink(DEFAULT_ORDER_MESSAGE)} target="_blank" rel="noopener noreferrer">
          WhatsApp {WHATSAPP_DISPLAY}
        </a>
        <p className="footer-small">© {new Date().getFullYear()} {BRAND}. Candy sold separately unless bundled.</p>
      </footer>

      <a
        className="fab"
        href={whatsappLink(DEFAULT_ORDER_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>

      <Motion />
    </>
  );
}
