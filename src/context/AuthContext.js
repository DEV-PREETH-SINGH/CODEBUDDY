// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);  // This will update the user state when auth state changes
    return subscriber;  // Unsubscribe on unmount
  }, []);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // After account creation, update the displayName
      await userCredential.user.updateProfile({
        displayName: name,  // Set displayName to the user's name
      });

      alert('User registered successfully');
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    if (user) {
      try {
        await auth().signOut();
      } catch (e) {
        alert('Error logging out: ' + e.message);
      }
    } else {
      alert('No user currently signed in');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
