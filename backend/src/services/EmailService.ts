import { Resend } from "resend";

export class EmailService {
  static async send(data: { name: string; email: string; message: string }) {
    const emailFrom = process.env.EMAIL_FROM?.trim();
    const emailTo = process.env.EMAIL_TO?.trim();
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (!resendApiKey || !emailFrom || !emailTo) {
      throw new Error(
        "Resend configuration is incomplete. Check your backend .env file.",
      );
    }

    const resend = new Resend(resendApiKey);

    try {
      await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        replyTo: data.email,
        subject: `New contact from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      });
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to send email: ${details}`);
    }
  }
}
