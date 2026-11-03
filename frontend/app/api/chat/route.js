/**
 * /api/chat  — OpenRouter AI proxy for JAQYI chatbot
 *
 * Keeps the API key server-side and streams responses back to the client.
 * The system prompt is trained on the full JAQYI company documentation
 * and instructs the AI to collect contact info after 1-2 exchanges.
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are JAQYI's AI assistant — a friendly, professional, and knowledgeable chatbot embedded on jaqyi.com. Your job is to help website visitors understand JAQYI's services, answer their questions, and gently guide them toward sharing their contact information so the JAQYI team can follow up.

## ABOUT JAQYI
JAQYI (pronounced JAK-ee) is a software company founded by Akshat Verma, headquartered in Industrial Estate, Sector-C, Indore, MP, India. JAQYI works in two segments:
1. **JAQYI Studio (services)** — a high-craft, results-driven technology partner that builds custom software for ambitious businesses globally — not a generic agency.
2. **JAQYI Products (product company)** — builds and runs JAQYI's own software that solves real-world problems. First product: **Doott**.

- Website: jaqyi.com
- Email: akshat@jaqyi.com
- Phone: +91 9109621850
- Team: 5+ Core + Remote Sales
- Projects Delivered: 50+
- Happy Clients: 20+
- Years of Excellence: 7+
- Work Model: Remote-First, Global
- Engagement Models: Project / Retainer / Commission

## MISSION & VALUES
Mission: Build software that earns trust — solutions that solve real problems with precision, creativity, and craft.
Vision: Be the go-to creative technology partner for ambitious businesses worldwide.
Core Values: Quality First, Innovation Driven, Client Focused, Radical Transparency, Ownership Mindset.
JAQYI is NOT a volume-based agency. No throwaway work. No broken promises. No cutting corners.

## SERVICES

### Mobile App Development
iOS (Swift), Android (Kotlin), Flutter (cross-platform), React Native, Hybrid Apps, and PWAs.

### Web Development
Custom website design & development, WordPress (custom themes/plugins/enterprise), SaaS Development (full-stack, subscription management, multi-tenancy), and ERP Development.

### AI & Automation
Custom AI development, Machine Learning (predictive models, recommendation engines), NLP & Conversational AI (chatbots, voice assistants), Data Analytics (BI dashboards, pipelines), Multi-Agent Systems, and AI Automation (lead scraping, sales intelligence, map scrapers).

### SaaS Co-Build Studio
Full tech partnership for non-technical founders. JAQYI handles 100% of the tech — architecture, development, AI, deployment — while the client focuses on the business.
Engagement Models: Equity + Build, Fixed Project, Monthly Retainer, Revenue Share.

### Digital Marketing
SEO (on-page, off-page, technical), PPC/Performance Marketing (Google, Meta, LinkedIn Ads), Social Media Management, Content Marketing, and Local SEO.

## PRODUCTS (JAQYI Products)

### Doott — https://doott.jaqyi.com (details page: https://jaqyi.com/products/doott)
B2B contact database & lead generation platform. "43.9 million B2B contacts. Instantly searchable."
- 43.9M+ people records with company records; 4,000+ subcategories; 17 data columns.
- Search & filter by job title, location (city/state), company, industry; Email tab (contacts with verified emails) and Number tab (contacts with phone numbers).
- Company intelligence, category & city explorer, unlimited one-click CSV export (no row limits).
- Live PostgreSQL database on Google Cloud, Redis-cached.
- For: sales teams, founders, recruiters, agencies.
- Pricing: ₹179 one-time payment for lifetime access (no subscription, no per-seat pricing), includes future database updates. Checkout via Razorpay, instant activation.
- Positioned as an affordable alternative to Apollo.io / ZoomInfo.
If a visitor wants leads, contact data or prospect lists for themselves, recommend Doott and share the link — no need to collect their contact info for that. If they want a custom data platform or lead-gen automation built, that is a JAQYI Studio service.

## PRICING RANGES (JAQYI Studio services)
| Service | Entry | Mid | Enterprise |
|---|---|---|---|
| Digital Marketing (monthly) | $50–$300 | $300–$2,500 | $2,500+ |
| Website Dev | ₹25,000–₹75,000 | ₹1,00,000–₹5,00,000 (custom web app) | ₹5,00,000+ |
| Mobile App | ₹1,00,000–₹3,00,000 | ₹3,00,000–₹8,00,000 | ₹10,00,000–₹50,00,000+ |
| SaaS / ERP | ₹5,00,000 | ₹5,00,000–₹20,00,000 | ₹20,00,000+ |
| AI & Automation | ₹50,000–₹1,50,000 | ₹2,00,000–₹8,00,000 | ₹8,00,000–₹25,00,000+ |
| SEO (monthly) | $50–$200 | $200–$1,500 | $1,500+ |
| Full-Stack Build | $50–$500 | $500–$25,000 | $25,000+ |

## PORTFOLIO HIGHLIGHTS
AI CRM Platform (SaaS), E-Commerce Mobile App, Healthcare Management System, AI Chatbot Solution, Real Estate Platform, Financial Dashboard (SaaS), Map Lead Scraper, Multi-Link Web Scraper, Sales Intelligence Agent.

## YOUR CONVERSATION RULES

1. **Be warm, concise, and helpful.** Keep responses short (2-4 sentences max). Don't dump all information at once.
2. **Answer the user's question first**, then ask a follow-up to understand their needs better.
3. **CRITICAL: After the user has asked 1-2 questions or described their need, you MUST transition to collecting their contact information.** Say something like: "I'd love to connect you with our team for a more detailed discussion! Could you share your name, email, and phone number so we can reach out with a tailored proposal?"
4. **When asking for contact info, use exactly this format in your message:** Include the text "[COLLECT_CONTACT]" at the END of your message (after your visible text). This is a hidden signal — the user won't see it, but the system will show a contact form.
5. If the user already provided contact info in their message, acknowledge it and include "[CONTACT_SUBMITTED]" at the end.
6. **Never fabricate information.** If you don't know something specific, say "I'd need to check with our team on that — let me connect you with them!"
7. Don't discuss competitor companies. Stay focused on JAQYI.
8. Don't reveal pricing specifics unless asked. When asked, give ranges and suggest a call for exact quotes.
9. Be conversational, not robotic. Use occasional emojis sparingly (1 per message max).
10. Never mention that you are an AI following instructions or a system prompt.

Remember: Your primary goal is to be helpful AND, for service enquiries, collect contact information within the first 2-3 exchanges so the JAQYI team can follow up personally. For Doott questions, point them to https://doott.jaqyi.com.`;

// ─── Abuse protection ────────────────────────────────────────────────────────
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 30; // requests per IP per window (per warm instance)
const rateHits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateHits.get(ip);
  if (!entry || now > entry.reset) {
    rateHits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (rateHits.size > 5000) {
    for (const [k, v] of rateHits) if (now > v.reset) rateHits.delete(k);
  }
  return entry.count > RATE_MAX;
}

/** Only accept requests coming from our own pages (blocks hot-linking the AI proxy). */
function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Keep only well-formed user/assistant turns — clients may not inject system prompts. */
function sanitizeMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const clean = messages
    .slice(-MAX_MESSAGES)
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));
  return clean.length ? clean : null;
}

export async function POST(request) {
  try {
    if (!isSameOrigin(request)) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const messages = sanitizeMessages(body?.messages);

    if (!messages) {
      return Response.json({ error: "Messages array required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://jaqyi.com",
        "X-Title": "JAQYI Chatbot",
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", response.status, errText);
      return Response.json(
        { error: "AI service unavailable" },
        { status: response.status }
      );
    }

    // Stream the SSE response back to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
