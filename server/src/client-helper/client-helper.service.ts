import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { SendEmail } from 'src/db/client-helper';

@Injectable()
export class ClientHelperService {
    
    private emailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS,
        }
    });

    public sendMessageOnEmail(sendEmail: SendEmail) {
        return new Promise((req, rej) => {
            this.emailTransporter.sendMail({
                from: `"Socks Shop" <${process.env.EMAIL_NAME}>`,
                to: sendEmail.email,
                subject: sendEmail.subject,
                text: sendEmail.message,
                html: sendEmail.html,
            })
            .then(req)
            .catch(rej);
        })
    }
}
