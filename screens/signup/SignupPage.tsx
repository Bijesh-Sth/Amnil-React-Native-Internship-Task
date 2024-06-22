import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {Button, Input} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hashPassword} from '../../utilities/encryption';

type SignupScreenProps = {
  navigation: any;
};

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        phone: '',
        website: '',
      };

      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Success', 'Signup successful');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account on SO.</Text>
      <TouchableOpacity
        style={[styles.socialButton, styles.googleButton]}
        onPress={() => {}}>
        <Text style={styles.socialButtonText}>Signup with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.socialButton, styles.appleButton]}
        onPress={() => {}}>
        <Text style={[styles.socialButtonText, {color: '#fff'}]}>
          Signup with Apple
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.socialButton, styles.facebookButton]}
        onPress={() => {}}>
        <Text style={[styles.socialButtonText, {color: '#fff'}]}>
          Signup with Facebook
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or by email</Text>
      <Input placeholder="Name" value={name} onChangeText={setName} />
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
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Sign in
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
  loginText: {
    color: '#3498db',
  },
});

export default SignupScreen;
