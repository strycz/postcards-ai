import { Stack } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Atom, AudioWaveform } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
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
          name="pricing"
          options={{
            title: 'Pricing',
          }}
        />
      </Stack>
  )
}
