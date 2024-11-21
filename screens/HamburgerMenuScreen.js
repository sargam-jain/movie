// screens/HamburgerMenuScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HamburgerMenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Hamburger Menu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HamburgerMenuScreen;

