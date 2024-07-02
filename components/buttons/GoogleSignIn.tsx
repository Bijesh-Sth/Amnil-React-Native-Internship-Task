import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Alert, Text, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

GoogleSignin.configure({
  webClientId: '822333088725-o0f1a4jhofusjif7ukav5c68ulttm84c.apps.googleusercontent.com',
});

async function onGoogleButtonPress(navigation) {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    navigation.navigate('Profile');
  } catch (error) {
    console.error(error);
    Alert.alert('Google Sign-In Error', error.message);
  }
}

function GoogleSignIn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={() => onGoogleButtonPress(navigation).then(() => console.log('Signed in with Google!'))}>
      <Image source={require('../../assets/google.png')} style={styles.icon} />
      <Text style={styles.socialButtonText}>Signup with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderColor: '#db4437',
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default GoogleSignIn;
