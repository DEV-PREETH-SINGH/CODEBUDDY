// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext'; // Import AuthProvider
import AppNavigator from './src/Navigation/AppNavigator'; // Import navigation stack

import { firebaseConfig } from './src/firebase/config';
import firebase from '@react-native-firebase/app';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the already initialized app
}

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator /> 
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
