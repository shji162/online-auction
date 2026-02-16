import * as React from 'react';
import { Html, Button, Heading, Link, Body, Text } from '@react-email/components';

interface confirmationEmailProps{
    domain: string
    token: string
}

export function confirmationEmail({domain, token}: confirmationEmailProps) {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`

  return (
    <Html lang="en">
      <Body>
            <Heading>подтверждение почты</Heading>
            <Text>

            </Text>
            <Link href={confirmLink}>
            подтвердить почту
            </Link>
      </Body>
    </Html>
  );
};
