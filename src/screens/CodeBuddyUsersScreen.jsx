// src/screens/AnotherScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnotherScreen = ({ route }) => {
  const { userName } = route.params;  // Extracting the passed userName from route.params

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>User Name: {userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
  },
});

export default AnotherScreen;
