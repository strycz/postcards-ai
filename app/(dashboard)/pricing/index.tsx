import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PricingScreen() {
  const handlePurchase = (amount: number) => {
    // Implement purchase logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Points Pricing</Text>
      <Text style={styles.description}>
        Credit points are used to pay for chatGPT generated content usage. You can use these points
        to generate new images and image descriptions.
      </Text>
      <View style={styles.pricingContainer}>
        <PricingOption title="Starter" points={100} price={9.99} onPurchase={handlePurchase} />
        <PricingOption title="Pro" points={500} price={39.99} onPurchase={handlePurchase} />
        <PricingOption
          title="Enterprise"
          points={2000}
          price={149.99}
          onPurchase={handlePurchase}
        />
      </View>
    </View>
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
    <View style={styles.optionContainer}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionPoints}>{points} Points</Text>
      <Text style={styles.optionPrice}>${price}</Text>
      <TouchableOpacity style={styles.purchaseButton} onPress={() => onPurchase(points)}>
        <Text style={styles.purchaseButtonText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
  },
  pricingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionPoints: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionPrice: {
    fontSize: 16,
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
