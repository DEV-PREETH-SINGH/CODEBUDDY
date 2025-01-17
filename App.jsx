// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/Navigation/AppNavigator';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD5jZIEh69eWPby49ZGb48QT5YowLy7h84',
  authDomain: 'codebuddy-928a6.firebaseapp.com',
  databaseURL: 'https://codebuddy-928a6.firebaseio.com',
  projectId: 'codebuddy-928a6',
  storageBucket: 'codebuddy-928a6.appspot.com',
  messagingSenderId: '1096495719915',
  appId: '1:1096495719915:android:e522d2ff375b55297fe5ae',
  measurementId: 'G-YOUR_MEASUREMENT_ID', // If not using Analytics, this can be omitted.
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
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
