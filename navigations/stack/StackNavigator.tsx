import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from '..';
import {
  HomeScreen,
  DetailsScreen,
  SplashScreen,
  SignupScreen,
  ProfileScreen,
  ValidateLoginScreen,
  LoginScreen,
} from '../../screens';

type RootStackParamList = {
  Splash: undefined;
  Tab: undefined;
  Home: undefined;
  Details: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  ValidateLogin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="ValidateLogin" component={ValidateLoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
