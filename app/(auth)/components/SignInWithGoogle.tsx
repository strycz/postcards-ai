import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useWarmUpBrowser } from './useWarmUpBrowser';
import { Button, YStack } from 'tamagui';
import { GoogleLogo } from 'assets/icons/GoogleLogo';

WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleSocialLogin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <YStack>
      <Button
        onPress={handleSocialLogin}
        variant="outlined"
        icon={<GoogleLogo width="18" />}
        size="$3"
        paddingVertical="$4"
        paddingHorizontal="$7"
      />
    </YStack>
  );
};
export default SignInWithGoogle;
