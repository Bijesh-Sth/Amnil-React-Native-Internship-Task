import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
  
    // Check if the user pressed the notification
    if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
      console.log('User pressed the notification:', notification);
    }
  });

AppRegistry.registerComponent(appName, () => App);
