// Cloudflare Pages Function — handles POST /api/quote
// Sends quote submissions via MailChannels (free, Cloudflare-native)
// No third-party API keys required — Cloudflare Workers are pre-authorized senders.

export const onRequestPost = async ({ request }: { request: Request }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let body: {
    name: string;
    email: string;
    phone: string;
    country: string;
    material: string;
    color: string;
    quantity: string;
    layerHeight: string;
    notes?: string;
    desiredDate?: string;
    fileCount?: number;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const {
    name, email, phone, country, material,
    color, quantity, layerHeight, notes, desiredDate, fileCount,
  } = body;

  if (!name || !email || !material) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const fields = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone || "—" },
    { label: "Country", value: country || "—" },
    { label: "Material", value: material },
    { label: "Color", value: color || "—" },
    { label: "Quantity", value: quantity || "—" },
    { label: "Layer Height", value: layerHeight || "—" },
    { label: "Desired Date", value: desiredDate || "—" },
    { label: "Files Uploaded", value: fileCount ? String(fileCount) : "0" },
    { label: "Notes", value: notes || "—" },
  ];

  const rows = fields
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #1E232B;color:#8B919E;font-size:13px;white-space:nowrap">${f.label}</td><td style="padding:8px 12px;border-bottom:1px solid #1E232B;color:#fafafa;font-size:13px">${f.value}</td></tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0F1115;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" style="max-width:600px;margin:0 auto;background:#0F1115">
<tr><td style="padding:32px 24px 20px">
<span style="font-size:18px;font-weight:700;color:#fafafa;letter-spacing:-0.02em">ZENKI<span style="color:#22D3EE">LAB</span></span>
</td></tr>
<tr><td style="padding:0 24px 8px">
<h1 style="font-size:20px;font-weight:700;color:#fafafa;margin:0 0 4px">New Quote Request</h1>
<p style="font-size:14px;color:#8B919E;margin:0">${name} submitted a project enquiry.</p>
</td></tr>
<tr><td style="padding:20px 24px">
<table width="100%" style="background:#161A20;border-radius:12px;border:1px solid rgba(255,255,255,0.06);overflow:hidden">
${rows}
</table>
</td></tr>
<tr><td style="padding:24px">
<p style="font-size:12px;color:#4B5260;margin:0">Sent via Zenki Lab quoting system · Reply directly to this email to respond to ${name}</p>
</td></tr>
</table>
</body>
</html>`;

  try {
    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "zenkilabhq@gmail.com", name: "Zenki Lab" }],
            dkim_domain: "zenkilab.com",
            dkim_selector: "mailchannels",
            dkim_private_key: "[set-in-cloudflare-env]",
          },
        ],
        from: {
          email: "quote@zenkilab.com",
          name: "Zenki Lab",
        },
        subject: `New Quote Request from ${name}`,
        content: [
          { type: "text/plain", value: `New quote request from ${name} (${email}). Phone: ${phone}. Material: ${material}. Notes: ${notes || "None"}.` },
          { type: "text/html", value: html },
        ],
        reply_to: { email, name },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("MailChannels error:", err);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Email send error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};