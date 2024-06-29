import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator, BottomTabNavigator, Navigation} from './navigations';
import {AppProvider} from './context';
import messaging from '@react-native-firebase/messaging';

import { useEffect } from 'react';
import { Alert } from 'react-native';

import {PermissionsAndroid} from 'react-native';
 
// import store from './store/store';
// import {Provider} from 'react-redux';


PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token: ', token);
  }

  useEffect(() => {
    requestUserPermission()
    getToken()
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppProvider>
    // <NavigationContainer>
    //   <BottomTabNavigator />
    // </NavigationContainer>
  );
}

export default App;
