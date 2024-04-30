import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function RegularText({children, style, ...props}) {    
  return <Text style={[styles.regular, style]} {...props}>{children}</Text>;
}

export function Medium500Text({children, style, ...props}) {
  return <Text style={[styles.medium, style]} {...props}>{children}</Text>;
}

export function Bold700Text({children, style, ...props}) {
  return <Text style={[styles.bold, style]} {...props}>{children}</Text>;
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'DMSans_400Regular',
  },
  medium: {
    fontFamily: 'DMSans_500Medium',
  },
  bold: {
    fontFamily: 'DMSans_700Bold'
  }
});
