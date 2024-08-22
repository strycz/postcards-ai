import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { XStack, Text, Button } from 'tamagui';
import { ChevronLeft, Menu } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <XStack
      backgroundColor="#ffffff00"
      paddingVertical="$2"
      paddingHorizontal="$4"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* <BlurView intensity={100} style={{ flex: 1 }}> */}
      <Button icon={<ChevronLeft />} onPress={() => navigation.goBack()} transparent />
      <Text fontSize="$6" fontWeight="bold">
        {title}
      </Text>
      <Button icon={<Menu />} onPress={() => console.log('menu')} transparent />
      {/* </BlurView> */}
    </XStack>
  );
}
