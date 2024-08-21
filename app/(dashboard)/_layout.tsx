import React from 'react';
import { Stack } from 'expo-router';
import { AnimatedHeader } from '../components/AnimatedHeader';
import { ScrollProvider } from '../context/ScrollContext';

export default function TabLayout() {
  return (
    <ScrollProvider>
      <AnimatedHeader />
      <Stack
        screenOptions={{
          header: () => null, // Hide the default header
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Stack One',
          }}
        />
        <Stack.Screen
          name="two"
          options={{
            title: 'Stack Two',
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="pricing"
          options={{
            title: 'Pricing',
          }}
        />
      </Stack>
    </ScrollProvider>
  );
}
