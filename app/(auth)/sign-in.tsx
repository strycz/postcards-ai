import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Button, Form, Input, Text, YStack, XStack, Separator } from 'tamagui';
import SignInWithGoogle from './components/SignInWithGoogle';
import SignInWithApple from './components/SignInWithApple';

export default function SignInPanel() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = React.useCallback(async () => {
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

  return (
    <YStack gap="$4" padding="$4" ai="center" borderRadius="$4" width="50%">
      <XStack gap="$2" mt="$4">
        <SignInWithGoogle />
        <SignInWithApple />
      </XStack>
      <XStack gap="$4" mt="$4" alignItems="center">
        <Separator bc="$gray5" bw="$0.5" w="100px" />
        <Text fontSize="12px" fontWeight="100">
          or
        </Text>
        <Separator bc="$gray5" bw="$0.5" w="100px" />
      </XStack>
      <Form onSubmit={onSignInPress}>
        <YStack gap="$4">
          <Input
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={setEmailAddress}
          />
          <Input
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Form.Trigger asChild>
            <Button>Sign In CLERK</Button>
          </Form.Trigger>
        </YStack>
      </Form>
      <XStack gap="$2" justifyContent="center">
        <Text>Don't have an account?</Text>
        <Link href="/sign-up" asChild>
          <Text color="$blue10">Sign up</Text>
        </Link>
      </XStack>
    </YStack>
  );
}
