import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack, Text, Button, Image } from 'tamagui';
import { useScroll } from '../context/ScrollContext';

const HEADER_HEIGHT = 60;

export const AnimatedHeader = () => {
  const scrollY = useScroll();
  const insets = useSafeAreaInsets();
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (scrollY) {
      const listener = scrollY.addListener(({ value }) => {
        animatedValue.setValue(value);
      });
      return () => scrollY.removeListener(listener);
    }
  }, [scrollY, animatedValue]);

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT + insets.top, HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const borderRadius = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 20],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: headerHeight,
          backgroundColor: animatedValue.interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: ['transparent', 'rgba(255,255,255,0.9)'],
            extrapolate: 'clamp',
          }),
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        },
      ]}
    >
      <XStack ai="center" jc="space-between" px="$4" f={1}>
        <XStack ai="center" gap="$2">
          <Image source={require('../../assets/logo.png')} width={30} height={30} />
          <Text fontSize={18} fontWeight="bold">
            Postcards AI
          </Text>
        </XStack>
        <XStack gap="$2">
          <Button size="$2">Pricing</Button>
          <Button size="$2">Generate</Button>
          <Button size="$2">Sign In</Button>
        </XStack>
      </XStack>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
});
