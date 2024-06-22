import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {Button, Input} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {comparePassword} from '../../utilities/encryption';
import {generateToken} from '../../utilities/token';

type LoginScreenProps = {
  navigation: any;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find((u: any) => u.email === email);

      if (!user) {
        Alert.alert('Error', 'No user found. Please sign up.');
        return;
      }

      const isPasswordMatch = await comparePassword(password, user.password);

      if (isPasswordMatch) {
        const token = generateToken();
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Profile', {user});
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to retrieve user data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SO.</Text>
      <TouchableOpacity
        style={[styles.socialButton, styles.googleButton]}
        onPress={() => {}}>
        <Text style={styles.socialButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.socialButton, styles.appleButton]}
        onPress={() => {}}>
        <Text style={[styles.socialButtonText, {color: '#fff'}]}>
          Login with Apple
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.socialButton, styles.facebookButton]}
        onPress={() => {}}>
        <Text style={[styles.socialButtonText, {color: '#fff'}]}>
          Login with Facebook
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or by email</Text>
      <Input
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleLogin} />
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Signup')}>
          Create an account
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
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
  appleButton: {
    backgroundColor: '#000000',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  socialButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#6c757d',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6c757d',
  },
  signupText: {
    color: '#3498db',
  },
});

export default LoginScreen;
