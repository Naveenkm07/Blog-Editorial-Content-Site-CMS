function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  };
}

function isValidEmail(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, message: "Method not allowed" });
  }

  let payload = null;
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { ok: false, message: "Invalid JSON" });
  }

  const email = payload?.email;

  if (!isValidEmail(email)) {
    return json(400, { ok: false, message: "Please provide a valid email." });
  }

  const provider = process.env.NEWSLETTER_PROVIDER || "placeholder";
  const apiKey = process.env.NEWSLETTER_API_KEY || "";

  console.log("newsletter_subscribe", {
    email: String(email).trim().toLowerCase(),
    provider,
    hasApiKey: Boolean(apiKey),
    ip:
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["client-ip"] ||
      event.headers["x-forwarded-for"] ||
      null,
    userAgent: event.headers["user-agent"] || null,
    ts: new Date().toISOString(),
  });

  // Placeholder integration points.
  // - Mailchimp: POST to /lists/{list_id}/members
  // - ConvertKit: POST to /forms/{form_id}/subscribe
  // Never hardcode API keys; use NEWSLETTER_API_KEY and provider-specific IDs.

  if (provider !== "placeholder" && !apiKey) {
    return json(500, {
      ok: false,
      message: "Newsletter provider configured but NEWSLETTER_API_KEY is missing.",
    });
  }

  return json(200, {
    ok: true,
    message: "Thanks — you’re subscribed (logged).",
  });
};
