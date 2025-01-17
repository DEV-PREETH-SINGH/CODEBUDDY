// src/screens/Home.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();  // Get user info from AuthContext

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {/* Wrapping text in <Text> component */}
          <Text style={styles.greeting}>Hello, {user.displayName}!</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text>No user currently signed in</Text>  
      )}
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
    marginBottom: 20,
  },
});

export default Home;
