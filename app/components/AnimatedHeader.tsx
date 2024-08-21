import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack, Text, Button, Image } from 'tamagui';
import { useScroll } from '../context/ScrollContext';
import { router } from 'expo-router';

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

  const blurIntensity = animatedValue.interpolate({
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
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        },
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={50} style={StyleSheet.absoluteFill} />
        ) : (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: animatedValue.interpolate({
                  inputRange: [0, HEADER_HEIGHT],
                  outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.7)'],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        )}
      </Animated.View>
      <XStack ai="center" jc="space-between" px="$4" f={1}>
        <Button chromeless onPress={() => router.push('/(dashboard)')}>
          <XStack ai="center" gap="$2">
            <Image source={require('../../assets/logo.png')} width={30} height={30} />
            <Text fontSize={18} fontWeight="bold" color="$gray12">
              Postcards AI
            </Text>
          </XStack>
        </Button>
        <XStack gap="$2">
          <Button size="$4" chromeless onPress={() => router.push('/pricing')}>
            Pricing
          </Button>
          <Button size="$4" chromeless onPress={() => router.push('/(dashboard)')}>
            Generate
          </Button>
          <Button size="$4" variant="outlined" onPress={() => router.push('/login')}>
            Sign In
          </Button>
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
    overflow: 'hidden',
  },
});
