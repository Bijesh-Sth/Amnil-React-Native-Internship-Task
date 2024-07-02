import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

function GoogleProfile() {
  const navigation = useNavigation();
  const user = auth().currentUser;
  console.log(user);
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign Out Error', error);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          {user.photoURL && <Image source={{ uri: user.photoURL }} style={styles.image} />}
          <Text style={styles.text}>Welcome, {user.displayName}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});

GoogleProfile.navigationOptions = {
  headerShown: false,
};

export default GoogleProfile;
