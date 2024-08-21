import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Button, Card, H1, H2, H3, Paragraph } from 'tamagui';

export default function PricingScreen() {
  const handlePurchase = (amount: number) => {
    // Implement purchase logic here
  };

  return (
    <ScrollView>
      <YStack f={1} p="$4" space="$4">
        <H1 ta="center">Credit Points Pricing</H1>
        <Paragraph ta="center">
          Credit points are used to pay for chatGPT generated content usage. You can use these
          points to generate new images and image descriptions.
        </Paragraph>
        <XStack flexWrap="wrap" jc="center" space="$4">
          <PricingOption title="Starter" points={100} price={9.99} onPurchase={handlePurchase} />
          <PricingOption title="Pro" points={500} price={39.99} onPurchase={handlePurchase} />
          <PricingOption
            title="Enterprise"
            points={2000}
            price={149.99}
            onPurchase={handlePurchase}
          />
        </XStack>
      </YStack>
    </ScrollView>
  );
}

interface PricingOptionProps {
  title: string;
  points: number;
  price: number;
  onPurchase: (amount: number) => void;
}

function PricingOption({ title, points, price, onPurchase }: PricingOptionProps) {
  return (
    <Card elevate size="$4" bordered width={300} p="$4" space="$2">
      <H2>{title}</H2>
      <H3>{points} Points</H3>
      <Text fontSize="$6" fontWeight="bold">
        ${price}
      </Text>
      <Button theme="active" size="$4" onPress={() => onPurchase(points)}>
        Purchase
      </Button>
    </Card>
  );
}
