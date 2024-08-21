import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Text, H1 } from 'tamagui';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign up logic here
    // Validate inputs, check if passwords match, etc.
  };

  const handleSocialSignUp = (provider: string) => {
    // Implement social sign up logic here
  };

  const navigateToLogin = () => {
    router.push('/(dashboard)/login' as any);
  };

  return (
    <YStack f={1} ai="center" jc="center" space="$4" p="$4">
      <H1>Sign Up</H1>
      <Input placeholder="Username" value={username} onChangeText={setUsername} width="100%" />
      <Input placeholder="Email" value={email} onChangeText={setEmail} width="100%" />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        width="100%"
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        width="100%"
      />
      <Button onPress={handleSignUp} theme="active" width="100%">
        Sign Up
      </Button>
      <XStack space="$2" mt="$4">
        <Button onPress={() => handleSocialSignUp('apple')} theme="gray">
          Apple
        </Button>
        <Button onPress={() => handleSocialSignUp('google')} theme="gray">
          Google
        </Button>
        <Button onPress={() => handleSocialSignUp('facebook')} theme="gray">
          Facebook
        </Button>
      </XStack>
      <Text onPress={navigateToLogin} color="$blue10" mt="$4">
        Already have an account? Log In
      </Text>
    </YStack>
  );
}
