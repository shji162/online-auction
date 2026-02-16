import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { Resend } from 'resend';
import { confirmationEmail } from './templates/confirmtionEmail.template';

const resend = new Resend('re_91WxGsYV_7TxbEZ4r8LgqbcFdEiVScJK9');

@Injectable()
export class MailService {

    constructor(private configService: ConfigService) {}

    async sendConfirmationEmail(email: string, token: string){
        const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN")

        const html = await render(confirmationEmail({domain, token}))

        return this.sendMail(email, 'подтверждение почты', html)
    }

     sendMail(email: string, sub: string, html: string) {
        return resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: sub,
            html: html
        });
    }
}
