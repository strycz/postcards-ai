import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useWarmUpBrowser } from './useWarmUpBrowser';
import { Button, YStack } from 'tamagui';
import { GitHubLogo } from 'assets/icons/GitHubLogo';
import { FacebookLogo } from 'assets/icons/FacebookLogo';

WebBrowser.maybeCompleteAuthSession();

const SignInWithFacebook = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_facebook' });

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
        icon={<FacebookLogo width="18" />}
        size="$3"
        paddingVertical="$4"
        paddingHorizontal="$7"
      />
    </YStack>
  );
};
export default SignInWithFacebook;
