export const BRAND = "Gumbelle";

export const WHATSAPP_NUMBER = "27764402486";
export const WHATSAPP_DISPLAY = "+27 76 440 2486";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_ORDER_MESSAGE =
  "Hi Gumbelle! 🍬 I'd love to order the 11\" Classic Gumball Machine. Is it in stock?";

export const GUMBALL_COLORS = [
  "#E8262B", // cherry
  "#FF6FB5", // bubblegum
  "#FFD23F", // lemon
  "#2BD98F", // apple
  "#3D8BFF", // blueberry
  "#8A4DFF", // grape
  "#FF8A1F", // tangerine
  "#FFFFFF", // vanilla
];

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  perks: string[];
  featured?: boolean;
  message: string;
};

export const PLANS: Plan[] = [
  {
    id: "solo",
    name: "The Solo",
    tagline: "Just the machine. Pure, shiny joy.",
    price: 649,
    compareAt: 799,
    perks: [
      '11" classic gumball machine',
      "Real glass globe + cast-metal base",
      "Built-in coin bank",
      "Free-spin mode",
    ],
    message:
      "Hi Gumbelle! 🍬 I'd like to order The Solo (11\" gumball machine) for R649.",
  },
  {
    id: "sweet-start",
    name: "The Sweet Start",
    tagline: "Machine + gumballs, ready to spin out the box.",
    price: 799,
    compareAt: 999,
    featured: true,
    perks: [
      "Everything in The Solo",
      "500g rainbow gumballs included",
      "Gift-ready wrapping",
      "Handwritten note (just ask)",
    ],
    message:
      "Hi Gumbelle! 🍬 I'd like to order The Sweet Start (machine + 500g gumballs) for R799.",
  },
  {
    id: "double-spin",
    name: "The Double Spin",
    tagline: "Two machines. One for you, one to gift.",
    price: 1249,
    compareAt: 1598,
    perks: [
      "2 × 11\" gumball machines",
      "1kg rainbow gumballs",
      "Gift-ready wrapping on both",
      "Priority courier",
    ],
    message:
      "Hi Gumbelle! 🍬 I'd like to order The Double Spin (2 machines + 1kg gumballs) for R1,249.",
  },
];

export const REFILL = {
  name: "Rainbow refill · 1kg",
  price: 149,
  message: "Hi Gumbelle! 🍬 I'd like to order a 1kg rainbow gumball refill (R149).",
};

export function rand(n: number) {
  return `R${n.toLocaleString("en-ZA").replace(/\s/g, ",")}`;
}
