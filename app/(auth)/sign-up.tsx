import * as React from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Button, Form, Input, Text, YStack, XStack } from 'tamagui';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <YStack gap="$4" padding="$4" minWidth="25%" alignSelf="center">
      {!pendingVerification ? (
        <Form onSubmit={onSignUpPress}>
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
              <Button>Sign Up</Button>
            </Form.Trigger>
          </YStack>
        </Form>
      ) : (
        <Form onSubmit={onPressVerify}>
          <YStack gap="$4">
            <Input value={code} placeholder="Verification Code..." onChangeText={setCode} />
            <Form.Trigger asChild>
              <Button>Verify Email</Button>
            </Form.Trigger>
          </YStack>
        </Form>
      )}
    </YStack>
  );
}
