import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

const resend = new Resend('re_91WxGsYV_7TxbEZ4r8LgqbcFdEiVScJK9');

@Injectable()
export class MailService {
    sendMail(email: string, sub: string, html: string) {
        return resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: sub,
            html: html
        });
    }
}
