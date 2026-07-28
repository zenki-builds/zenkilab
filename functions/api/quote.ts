// Cloudflare Pages Function — handles POST /api/quote
// Sends quote submissions via Resend API.
//
// Requires:
//   Cloudflare Pages env var: RESEND_API_KEY

interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const RESEND_API_KEY = env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY environment variable is not set");
    return new Response(
      JSON.stringify({ error: "Server not configured — missing Resend API key" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

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
    name,
    email,
    phone,
    country,
    material,
    color,
    quantity,
    layerHeight,
    notes,
    desiredDate,
    fileCount,
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

  const text = `New quote request from ${name} (${email}).\nPhone: ${phone}\nMaterial: ${material}\nQuantity: ${quantity}\nColor: ${color}\nNotes: ${notes || "None"}\nFiles: ${fileCount || 0}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Zenki Lab <quote@zenkilab.com>",
        to: ["quote@zenkilab.com"],
        subject: `New Quote Request from ${name}`,
        html,
        text,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      let errMsg = "Failed to send email";
      try {
        const errJson = JSON.parse(errText);
        errMsg = errJson.message || errJson.error || errText.substring(0, 200);
      } catch {
        errMsg = errText.substring(0, 200) || "Failed to send email";
      }
      return new Response(JSON.stringify({ error: errMsg }), {
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