# Heavy Duty Training — trainwithkeenan.vercel.app

Personal training and coaching site for Keenan Bernard. Built on Mike Mentzer's Heavy Duty principles: maximum intensity, minimum volume, every set to failure.

## Stack

- React 19 + Vite
- Vercel (hosting + analytics)
- Web3Forms (contact form)

## Features

- Training programs with bank transfer purchase flow
- 1:1 coaching enquiry form
- Mobile-responsive single-page app with page transitions
- Privacy policy and Terms of Use

## Dev

```bash
npm install
npm run dev
```

## Deploy

```bash
vercel --prod
```

## Notes

- Bank details live in the `BANKS` constant in `src/App.jsx`
- Web3Forms access key in `submit()` — intentionally public (like a Stripe publishable key)
- OG image at `public/og-image.png` — update if domain changes
- Update `canonical`, `og:url`, and JSON-LD `url` in `index.html` when moving to a custom domain
