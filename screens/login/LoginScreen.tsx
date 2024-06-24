import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Button, Input } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

type LoginScreenProps = {
  navigation: any;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
        navigation.replace('Profile', { user: data });
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SO.</Text>

      <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={() => { }}>
        <Image source={require('../../assets/google.png')} style={styles.icon} />
        <Text style={styles.socialButtonText}>Signup with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.appleButton]} onPress={() => { }}>
        <Image source={require('../../assets/apple.png')} style={styles.icon} />
        <Text style={styles.socialButtonText}>Signup with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={() => { }}>
        <Image source={require('../../assets/facebook.png')} style={styles.icon} />
        <Text style={styles.socialButtonText}>Signup with Facebook</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or by email</Text>

      <Input placeholder="Email Address" value={email} onChangeText={setEmail} />

      <View style={styles.passwordInputContainer}>
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={{ flex: 1 }} />
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      <Button title="Sign In" onPress={handleLogin} />

      {loading && (
        <View style={StyleSheet.absoluteFill}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
      )}

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.signupText} onPress={() => navigation.replace('Signup')}>
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
    backgroundColor: '#f0f0f0',
    borderColor: '#db4437',
    borderWidth: 1,
  },
  facebookButton: {
    backgroundColor: '#f0f0f0',
    borderColor: '#db4437',
    borderWidth: 1,
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
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
  },
  toggleButton: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default LoginScreen;
