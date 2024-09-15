import { router, Stack } from 'expo-router';
import { Button, useTheme, XStack } from 'tamagui';
import HeaderLogo from 'components/dashboard/HeaderLogo';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerBackTitle: '',
        headerTitle: (props) => <HeaderLogo />,
        headerRight: () => (
          <XStack gap="$4" mr="$4">
            <Button onPress={() => router.navigate('/pricing')} color="#fff">
              Pricing
            </Button>
            <Button onPress={() => router.navigate('/modal')} color="#fff">
              Login
            </Button>
          </XStack>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
    </Stack>
  );
}
