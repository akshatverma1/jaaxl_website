# JAQYI — Creative Software Studio

Marketing site for [jaqyi.com](https://jaqyi.com). JAQYI has two segments:

- **JAQYI Studio** (services) — custom web, mobile, SaaS & AI automation for clients → `/services`
- **JAQYI Products** (own software) — first product **Doott** ([doott.jaqyi.com](https://doott.jaqyi.com)) → `/products`, `/products/doott`

| Folder | Stack | Deploys to |
|---|---|---|
| `frontend/` | Next.js 16 (App Router), React 19, Tailwind, Framer Motion | Vercel |
| `backend/` | Express + Nodemailer (Gmail) — contact form & job applications | Vercel (serverless) |

## Local development

```bash
# Backend — http://localhost:8000
cd backend && cp .env.example .env   # fill in Gmail credentials
npm install && npm run dev

# Frontend — http://localhost:3000
cd frontend && cp .env.example .env.local
npm install && npm run dev
```

See each `.env.example` for every variable and what it does.

## How it fits together

- **Contact form, chatbot leads, job applications** → `NEXT_PUBLIC_API_URL` (backend) → email to `NOTIFY_EMAIL` + auto-reply to the visitor.
  All user input is HTML-escaped, rate-limited per IP and protected by a honeypot field.
- **AI chatbot** → `frontend/app/api/chat/route.js` → OpenRouter (key stays server-side). Same-origin only, rate-limited.
- **Analytics** → `POST /api/analytics` (public tracker) → Upstash Redis / Vercel KV.
  Dashboard at `/analytics` (data at `/analytics/data`), both behind Basic Auth in `frontend/proxy.js`.
- **Conversions** → WhatsApp/Doott/phone/email/booking clicks and form submissions are tracked to `/api/analytics` and shown on the dashboard.
- **CI** → `.github/workflows/ci.yml` builds the frontend and smoke-tests the backend on every PR and push to `main`.
- **SEO** → generated OG images (`opengraph-image.jsx` per section), `public/llms.txt` for AI search, `app/sitemap.js` (auto-includes every project in `data/projects.js`), `public/robots.txt`,
  JSON-LD on the home page (FAQ schema generated from `data/faqs.js`).

## Content

- Company facts, segments & site-wide Organization JSON-LD: `frontend/data/site.js`
- Products (Doott facts, features, pricing, FAQ): `frontend/data/products.js` — add a new product here and it appears on `/products`, the footer, the sitemap and the structured data
- FAQ: `frontend/data/faqs.js`
- Portfolio projects: `frontend/data/projects.js` — real screenshots live in `frontend/public/images/projects/`.
  Optional `caseStudy: { client, challenge, solution, results: [{ value, label }], quote }` renders a case-study section.
- Blog posts: `frontend/data/posts.js` · Doott comparisons: `frontend/data/comparisons.js`
- WhatsApp number & booking link: `frontend/data/site.js` (`NEXT_PUBLIC_BOOKING_URL` shows "Book a call" buttons)
- Other section copy: `frontend/data/mock.js`
- Chatbot knowledge & pricing: `SYSTEM_PROMPT` in `frontend/app/api/chat/route.js`
