import * as React from 'react';
import { Html, Heading, Link, Body, Text, Tailwind } from '@react-email/components';

interface passwordRecoveryProps{
    domain: string
    token: string
}

export function passwordRecovery({domain, token}: passwordRecoveryProps) {
    const resetLink = `${domain}/new-password?token=${token}`

  return (
    
      <Html lang="en">
        <Body>
          <Heading>Сброс пароля</Heading>
            <Text>
              Привет! Вы запросили сброс пароля. Пожалуйста, перейдите по ссылке ниже, чтобы создать новый пароль:
            </Text>
            <Link href={resetLink}>
            подтвердить сброс пароля
            </Link>
            <Text>
              Если вы не запрашивали сброс пароля проигнорируйте это письмо.
            </Text>
            <Text>Спасибо за использование нашего сервиса!</Text>
      </Body>
    </Html>
 

  );
};
