import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore'; // Import Firestore module

// Firebase configuration object
export const firebaseConfig = {
  apiKey: 'AIzaSyD5jZIEh69eWPby49ZGb48QT5YowLy7h84',
  authDomain: 'codebuddy-928a6.firebaseapp.com',
  databaseURL: 'https://codebuddy-928a6.firebaseio.com',
  projectId: 'codebuddy-928a6',
  storageBucket: 'codebuddy-928a6.appspot.com',
  messagingSenderId: '1096495719915',
  appId: '1:1096495719915:android:e522d2ff375b55297fe5ae',
};

// Initialize Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the already initialized app
}

// Export Firestore instance
export const db = firebase.firestore();
export { firebase };
