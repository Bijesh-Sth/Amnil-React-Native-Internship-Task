import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {SkeletonLoader} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenProps = {
  route: any;
  navigation: any;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({route, navigation}) => {
  const {user} = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [phone, setPhone] = useState<string>(user.phone);
  const [website, setWebsite] = useState<string>(user.website);

  useEffect(() => {
    setTimeout(() => {
      setProfileData(user);
      setIsLoading(false);
    }, 2000);
  }, [user]);

  const handleSave = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const updatedUsers = users.map((u: any) =>
        u.email === profileData.email ? {...u, phone, website} : u,
      );

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile data');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
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
      <Image source={{uri: profileData.avatar}} style={styles.avatar} />
      <Text style={styles.name}>{profileData.name}</Text>
      <Text style={styles.designation}>{profileData.designation}</Text>
      <TextInput
        style={styles.input}
        value={profileData.email}
        editable={false}
      />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput
        style={styles.input}
        value={website}
        onChangeText={setWebsite}
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
