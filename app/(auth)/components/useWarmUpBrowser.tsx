import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      WebBrowser.warmUpAsync();
    }
    return () => {
      if (Platform.OS !== 'web') {
        WebBrowser.coolDownAsync();
      }
    };
  }, []);
};
