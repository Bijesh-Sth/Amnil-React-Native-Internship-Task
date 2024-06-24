import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SkeletonLoader } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenProps = {
  route: any;
  navigation: any;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [phone, setPhone] = useState<string>(user.phone || '');
  const [gender, setGender] = useState<string>(user.gender || '');

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        let token = await AsyncStorage.getItem('token');
        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const refreshResponse = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          const refreshData = await refreshResponse.json();
          if (refreshResponse.ok) {
            await AsyncStorage.setItem('token', refreshData.token);
            token = refreshData.token;

            const retryResponse = await fetch('https://dummyjson.com/auth/me', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const retryData = await retryResponse.json();
            if (retryResponse.ok) {
              setProfileData(retryData);
              setPhone(retryData.phone || '');
              setGender(retryData.gender || '');
            } else {
              Alert.alert('Error', retryData.message || 'Failed to fetch profile data');
            }
          } else {
            Alert.alert('Error', refreshData.message || 'Failed to refresh token');
            navigation.replace('Login');
          }
        } else {
          const data = await response.json();
          if (response.ok) {
            setProfileData(data);
            setPhone(data.phone || '');
            setGender(data.gender || '');
          } else {
            Alert.alert('Error', data.message || 'Failed to fetch profile data');
          }
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch profile data');
        navigation.replace('Login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://dummyjson.com/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone,
          gender,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setProfileData(data);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile data');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile data');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Profile.png')} style={styles.avatar} />
      <Text style={styles.name}>{profileData.firstName} {profileData.lastName}</Text>
      <Text style={styles.designation}>{profileData.username}</Text>
      <TextInput
        style={styles.input}
        value={profileData.email}
        editable={false}
      />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        value={profileData.password}
        editable={false}
        secureTextEntry
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  designation: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
