import { useSignIn } from '@clerk/clerk-expo';
import { Airplay } from '@tamagui/lucide-icons';
import { api } from 'convex/_generated/api';
import { Authenticated, Unauthenticated, useConvexAuth, useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Anchor, Button, Paragraph, Text, View, XStack, YStack } from 'tamagui';

export default function SignInModal() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isLoading, isAuthenticated } = useConvexAuth();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('stryczniewicz@gmail.com');
  const [password, setPassword] = useState('desofher1');

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  const onSignOutPress = () => {};

  const messages = useQuery(api.tasks.getForCurrentUser);

  function Content() {
    const messages = useQuery(api.tasks.getForCurrentUser);

    return <Text>Authenticated content: {JSON.stringify(messages?.length)}</Text>;
  }

  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <YStack>
        <YStack>
          <Unauthenticated>
            <Button alignSelf="center" icon={Airplay} size="$6" onPress={onSignInPress}>
              "Sign In"
            </Button>
          </Unauthenticated>
          <Authenticated>
            <Content />
            <Button alignSelf="center" icon={Airplay} size="$6" onPress={onSignOutPress}>
              "Sign Out"
            </Button>
          </Authenticated>
        </YStack>
      </YStack>
    </View>
  );
}
