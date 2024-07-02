import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation, AuthStackNavigator  } from './navigations';
import { AppProvider } from './context';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import notifee, { EventType, Notification } from '@notifee/react-native';
import { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import SplashScreen2 from './screens/splash/SplashScreen2';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

async function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
  // Display a notification
  await notifee.displayNotification({
    title: message.notification?.title ?? 'Default Title',
    body: message.notification?.body ?? 'Default Body',
    android: {
      channelId: 'default',
      
    },
  });
}

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
};

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<null | any>(null);

  function onAuthStateChanged(user: null | any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    requestUserPermission();
    getToken();

    const unsubscribe = messaging().onMessage(onMessageReceived);

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'default') {
        
        console.log('User pressed the notification:', notification);
      }

      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return <SplashScreen2 />;

//   return (
//     <AppProvider>
//       <NavigationContainer>
//         <Navigation />
//       </NavigationContainer>
//     </AppProvider>
//   );
// };

return (
  <NavigationContainer>
    <AuthStackNavigator/>
  </NavigationContainer>
)
}

export default App;
