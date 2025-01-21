// src/screens/UserList.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/config';  // Import firebase config
import { useAuth } from '../context/AuthContext'; // Import your AuthContext

const UserList = ({ route }) => {
  const { date } = route.params;  // Access the date passed via navigation
  const { user } = useAuth();  // Get the current logged-in user
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        // Fetch the users for the specific date
        const doc = await firebase.firestore().collection('startToday').doc(date).get();

        if (doc.exists) {
          // Get the list of userIds, filter out null or empty values
          let userNames = doc.data().userIds || [];
          userNames = userNames.filter((name) => name && name.trim() !== '');  // Remove null, undefined, or empty names

          // Filter out the current user's display name
          userNames = userNames.filter((userName) => userName !== user?.displayName);

          // Set the filtered user names
          setUserList(userNames);
        } else {
          setUserList([]);  // If no data found for the date
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, [date, user?.displayName]);  // Dependency array includes date and user.displayName for proper updates

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users who started today ({date}):</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={userList}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UserList;
