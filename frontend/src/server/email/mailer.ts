export async function sendEmailCode(
  email: string,
  code: string,
  purpose: string
): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  // If in production and Resend is configured
  if (process.env.NODE_ENV === "production" && process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "no-reply@sungrowpower.com",
          to: normalizedEmail,
          subject: `Your SUNGROW Verification Code: ${code}`,
          html: `<p>Your verification code for <strong>${purpose}</strong> is: <h2 style="color:#fe7900;">${code}</h2></p><p>This code expires in 10 minutes.</p>`,
        }),
      });
      if (!response.ok) {
        console.error("Failed to send email via Resend:", await response.text());
      }
      return;
    } catch (err) {
      console.error("Resend delivery error:", err);
    }
  }

  // Dev Console Transport (prints clearly to server terminal)
  console.log(`\n======================================================`);
  console.log(`⚡ [SUNGROW DEV CONSOLE EMAIL TRANSPORT] ⚡`);
  console.log(`To:               ${normalizedEmail}`);
  console.log(`Purpose:          ${purpose}`);
  console.log(`Verification Code: ${code}`);
  console.log(`Expires in:       10 minutes`);
  console.log(`======================================================\n`);

  try {
    const fs = await import("fs");
    const path = await import("path");
    fs.writeFileSync(
      path.join(process.cwd(), ".last_code.json"),
      JSON.stringify({ email: normalizedEmail, code, purpose, timestamp: Date.now() }),
      "utf-8"
    );
  } catch (err) {
    console.error("Failed to write .last_code.json:", err);
  }
}
