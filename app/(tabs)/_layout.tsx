import { Link, Stack } from 'expo-router';
import { Button, useTheme } from 'tamagui';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Stack One',
          headerShown: true,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button mr="$4" bg="$purple8" color="$purple12">
                Hello GG!
              </Button>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="two"
        options={{
          title: 'Stack Two',
          headerShown: false,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button mr="$4" bg="$purple8" color="$purple12">
                Hello 123!
              </Button>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
