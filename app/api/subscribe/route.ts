import { NextResponse } from "next/server";

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;
const NEWSLETTER_WEBHOOK_URL = process.env.NEWSLETTER_WEBHOOK_URL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload?.source === "string" ? payload.source.trim().toLowerCase() : "portfolio";

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  if (BUTTONDOWN_API_KEY) {
    const response = await fetch("https://buttondown.email/api/emails", {
      method: "POST",
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        tags: ["portfolio", source],
        referrer: request.headers.get("referer") ?? undefined,
      }),
    });

    if (!response.ok) {
      const message = await response.text().catch(() => "Subscription failed.");
      return NextResponse.json({ error: message || "Subscription failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  }

  if (NEWSLETTER_WEBHOOK_URL) {
    const response = await fetch(NEWSLETTER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source,
        referrer: request.headers.get("referer"),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Subscription failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Newsletter is not configured yet. Please try again later." },
    { status: 500 }
  );
}
