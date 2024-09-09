import { Stack } from 'expo-router';
import { Button, Text, useTheme, XStack } from 'tamagui';
import { Atom, AudioWaveform } from '@tamagui/lucide-icons';
import { getHeaderTitle, useHeaderHeight } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          const headerHeight = useHeaderHeight();

          return (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={100}
              style={{
                flex: 1,
                padding: 20,
                margin: 16,
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 60,
              }}
            >
              <Text>{title}</Text>
            </BlurView>
          );
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="pricing/index"
        options={{
          title: 'Pricing',
        }}
      />
    </Stack>
  );
}
