import * as React from 'react';
import { Html, Heading, Link, Body, Text, Tailwind } from '@react-email/components';

interface confirmationEmailProps{
    domain: string
    token: string
}

export function confirmationEmail({domain, token}: confirmationEmailProps) {
    const confirmLink = `${domain}/auth/email-confirmation?token=${token}`

  return (
    <Tailwind >
      <Html lang="en">
        <Body className='text-black'>
          <Heading>подтверждение почты</Heading>
            <Text>
              Привет! Чтобы подтвердить свой адрес электронной почты перейдите по ссылке ниже:
            </Text>
            <Link href={confirmLink}>
            подтвердить почту
            </Link>
            <Text>
              Если вы не запрашивали подтверждения проигнорируйте это письмо.
            </Text>
            <Text>Спасибо за использование нашего сервиса!</Text>
      </Body>
    </Html>
    </Tailwind>

  );
};
