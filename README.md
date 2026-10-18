# Gumbelle — 11" Classic Gumball Machine

Playful, premium single-product site built with **Next.js (App Router)** and **GSAP** (ScrollTrigger, SplitText, Draggable + Inertia).

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Edit
- Prices, bundles, WhatsApp number: `lib/site.ts`
- Sections: `components/*` (composed in `app/page.tsx`)
- Styles/colour tokens: `app/globals.css`

All "Order" buttons open WhatsApp (+27 76 440 2486) with a pre-filled message for that bundle.
Deploy easily on Vercel (zero config).

## Deploy
Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://gumbelle.co.za`) so WhatsApp/social link previews use your domain. On Vercel this is picked up automatically.
