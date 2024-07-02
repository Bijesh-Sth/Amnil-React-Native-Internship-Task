import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import {GoogleSignIn} from '../../components';
import {GoogleProfile,LoginDemoScreen} from '../../screens';

export type AuthStackParamList = {
  GoogleSignIn: undefined;
  Profile: undefined;
  Login:undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="GoogleSignIn">
      <Stack.Screen name="Login" component={LoginDemoScreen} />
      <Stack.Screen name="Profile" component={GoogleProfile} options={{ headerLeft: () => null }} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
