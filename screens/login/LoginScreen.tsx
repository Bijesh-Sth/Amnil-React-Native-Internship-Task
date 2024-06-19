// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LoginScreen: React.FC = () => {
//   const [formData, setFormData] = useState({username: '', password: ''});
//   const [focusedInput, setFocusedInput] = useState('');

//   const handleInputChange = (field: keyof typeof formData, value: string) => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleInputFocus = (field: keyof typeof formData) => {
//     setFocusedInput(field);
//   };

//   const handleInputBlur = () => {
//     setFocusedInput('');
//   };

//   const handleLogin = async () => {
//     try {
//       await AsyncStorage.setItem('username', formData.username);
//       console.log('Username stored successfully:', formData.username);
//     } catch (error) {
//       console.error('Error storing username:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Username</Text>
//       <TextInput
//         style={[
//           styles.input,
//           focusedInput === 'username' && styles.inputFocused,
//         ]}
//         value={formData.username}
//         onChangeText={text => handleInputChange('username', text)}
//         onFocus={() => handleInputFocus('username')}
//         onBlur={handleInputBlur}
//         placeholder="Enter username"
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={[
//           styles.input,
//           focusedInput === 'password' && styles.inputFocused,
//         ]}
//         value={formData.password}
//         onChangeText={text => handleInputChange('password', text)}
//         onFocus={() => handleInputFocus('password')}
//         onBlur={handleInputBlur}
//         placeholder="Enter password"
//         secureTextEntry={true}
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     width: '80%',
//     borderRadius: 5,
//   },
//   inputFocused: {
//     borderColor: 'blue',
//   },
//   loginButton: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;

import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

export default class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Text>LoginScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
