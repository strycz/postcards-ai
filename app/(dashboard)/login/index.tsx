import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Text, H1 } from 'tamagui';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic here
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
  };

  const handleSignUp = () => {
    // Navigate to sign up page
    router.push('/(dashboard)/signup' as any);
  };

  return (
    <YStack f={1} ai="center" jc="center" space="$4" p="$4">
      <H1>Login</H1>
      <Input placeholder="Username" value={username} onChangeText={setUsername} width="100%" />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        width="100%"
      />
      <Button onPress={handleLogin} theme="active" width="100%">
        Login
      </Button>
      <Text onPress={handleForgotPassword} color="$blue10">
        Forgot Password?
      </Text>
      <XStack space="$2" mt="$4">
        <Button onPress={() => handleSocialLogin('apple')} theme="gray">
          Apple
        </Button>
        <Button onPress={() => handleSocialLogin('google')} theme="gray">
          Google
        </Button>
        <Button onPress={() => handleSocialLogin('facebook')} theme="gray">
          Facebook
        </Button>
      </XStack>
      <Text onPress={handleSignUp} color="$blue10" mt="$4">
        Don't have an account? Sign Up
      </Text>
    </YStack>
  );
}
