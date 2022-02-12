const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта ${process.env.CLIENT_HOST}`,
            text: '',
            html: `
      <div>
        <h1>Чтобы подтвердить аккаунт на ${process.env.CLIENT_HOST}, пройдите по ссылке</h1>
        <a href=${link}>${link}</a>
      </div>
      `,
        });
    }
}

module.exports = new EmailService();
