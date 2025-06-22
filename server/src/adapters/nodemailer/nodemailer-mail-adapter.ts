import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f9d0e39f308a4e",
    pass: "e340e5de3e75e4",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    const feedback = await await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Rodrigo Sena <rodrigo.sena1163@gmail.com>",
      subject,
      html: body,
    });
  }
}
