// The contact form's first-party endpoint. A Vercel Node function: validate here,
// send here, hold the honeypot here. No third-party form service sits in the middle.
//
// Transport is Resend (already the processor this site discloses), called with plain
// fetch — the repo has no package.json and nothing else needs one.
//
// Without RESEND_API_KEY set in the Vercel project, the function answers
//   503 {"error":"form transport not configured"}
// and the page says exactly that. It does not pretend to have sent anything.

const TO = "hello@projectxprotocol.dev";
const FROM = "ProjectX site form <form@projectxprotocol.dev>";

// name, email, topic, message, plus the honeypot field. Nothing else is read.
const TOPICS = [
  "sales",
  "verify",
  "weir",
  "draws",
  "names",
  "range",
  "security disclosure",
  "press",
];

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    json(res, 405, { error: "POST only" });
    return;
  }

  let payload;
  try {
    payload = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
  } catch (e) {
    json(res, 400, { error: "body is not JSON" });
    return;
  }

  // Honeypot. A filled field is a bot: answer 200 like a real send so the bot
  // learns nothing, store nothing, forward nothing.
  if (String(payload.company_alt || "").trim() !== "") {
    json(res, 200, { ok: true });
    return;
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const topic = String(payload.topic || "").trim();
  const company = String(payload.company || "").trim();
  const message = String(payload.message || "").trim();

  const problems = [];
  if (name.length < 1 || name.length > 200) problems.push("name is missing or too long");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) problems.push("email does not look like an email");
  if (!TOPICS.includes(topic)) problems.push("topic is not one of the listed ones");
  if (message.length < 1 || message.length > 500) problems.push("message is missing or over 500 characters");
  if (company.length > 200) problems.push("company is too long");
  if (problems.length > 0) {
    json(res, 400, { error: problems.join("; ") });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    json(res, 503, { error: "form transport not configured" });
    return;
  }

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = [
    ["name", name],
    ["email", email],
    ["topic", topic],
    ...(company ? [["company", company]] : []),
  ];

  let sent;
  try {
    sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: "[projectxprotocol.dev] " + topic + " — " + name,
        text:
          lines.map((p) => p[0] + ": " + p[1]).join("\n") +
          "\n\n" +
          message,
        html:
          "<p>" +
          lines.map((p) => "<b>" + esc(p[0]) + "</b>: " + esc(p[1])).join("<br>") +
          "</p><pre style='white-space:pre-wrap;font:inherit'>" +
          esc(message) +
          "</pre>",
      }),
    });
  } catch (e) {
    json(res, 502, { error: "could not reach the mail transport" });
    return;
  }

  if (!sent.ok) {
    json(res, 502, { error: "the mail transport refused the message" });
    return;
  }

  json(res, 200, { ok: true });
};
