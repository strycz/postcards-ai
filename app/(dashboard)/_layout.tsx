import { router, Stack } from 'expo-router';
import { Button, useTheme, XStack } from 'tamagui';
import HeaderLogo from 'components/dashboard/HeaderLogo';
import { useConvexAuth } from 'convex/react';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signOut } = useAuth();

  const handleLoginPress = () => {
    isAuthenticated ? signOut() : router.navigate('/(auth)/sign-in');
  };

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
            <Button onPress={handleLoginPress} color="#fff">
              {isAuthenticated ? 'Logout' : 'Login'}
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
