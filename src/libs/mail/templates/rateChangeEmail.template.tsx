import * as React from 'react';
import { Html, Heading, Link, Body, Text, Tailwind } from '@react-email/components';

interface rateEmailProps{
   auctionName: string
   userName: string
}

export function RateEmail({auctionName, userName}: rateEmailProps) {

  return (
    <Tailwind >
      <Html lang="en">
        <Body className='text-black'>
          <Heading>ставка перебита</Heading>
            <Text>
              аукцион {auctionName} - ставка перебита пользователем {userName}
            </Text> 
      </Body>
    </Html>
    </Tailwind>

  );
};
