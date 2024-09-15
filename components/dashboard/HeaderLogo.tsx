import { Image, Text, XStack } from 'tamagui';

// header: ({ navigation, route, options, back }) => {

const HeaderLogo = () => {
  return (
    <XStack ai="center" gap="$2">
      <Image source={require('../../assets/logo.png')} width={30} height={30} />
      <Text fontSize={18} fontWeight="bold" color="$gray12">
        Postcardly
      </Text>
    </XStack>
  );
};

export default HeaderLogo;
