import React from 'react';
import { View } from 'react-native';
import { useTheme } from './ThemeContext';

export default function ThemedView({ style, children }) {
  const { theme } = useTheme();
  return <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, style]}>{children}</View>;
}
