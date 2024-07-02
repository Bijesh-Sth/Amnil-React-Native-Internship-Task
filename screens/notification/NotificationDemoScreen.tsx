import React from 'react';
import { View, Button, Alert } from 'react-native';
import notifee from '@notifee/react-native';

const NotificationDemoScreen = () => {
  async function onDisplayNotification() {
    try {
      // Request permissions (required for iOS)
      const permission = await notifee.requestPermission();

      if (permission.authorizationStatus < 1) {
        Alert.alert('Permissions not granted', 'Notification permissions are required.');
        return;
      }

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.error('Notification error:', error);
      Alert.alert('Notification Error', 'An error occurred while displaying the notification.');
    }
  }

  return (
    <View>
      <Button title="Display Notification" onPress={onDisplayNotification} />
    </View>
  );
};

export default NotificationDemoScreen;
