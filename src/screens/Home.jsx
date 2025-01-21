import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/config';
import { useAuth } from '../context/AuthContext';  // Import your AuthContext

const Home = ({ navigation }) => {
  const { user } = useAuth();  // Get the current logged-in user from AuthContext
  const [loading, setLoading] = useState(false);
  const [date] = useState(new Date().toISOString().split('T')[0]);  // Get today's date in YYYY-MM-DD format

  // Handle the "Start Today" button press
  const handleStartToday = async () => {
    if (!user || !user.displayName) {
      Alert.alert('Error', 'User data is not available. Please try again.');
      return;
    }

    try {
      setLoading(true);
      const docRef = firebase.firestore().collection('startToday').doc(date);  // Reference to the specific date document
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data();
        const userIds = data.userIds || [];

        // Add user displayName to the user list if it's not already present
        if (!userIds.includes(user.displayName)) {
          userIds.push(user.displayName);
          await docRef.update({ userIds });
        }
      } else {
        // If document doesn't exist, create it with the user list
        await docRef.set({
          userIds: [user.displayName],
        });
      }

      Alert.alert('Success', 'Your name has been recorded!');
    } catch (error) {
      console.error("Error updating database:", error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.displayName}!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Start Today" onPress={handleStartToday} />
      )}

      {/* Navigate to the UserList screen to see users who started today */}
      <Button title="View Users Who Started Today" onPress={() => navigation.navigate('UserList', { date })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Home;
