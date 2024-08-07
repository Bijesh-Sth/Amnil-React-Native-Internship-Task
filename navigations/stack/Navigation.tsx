import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { CameraScreen, ImagePickerScreen, CrashTestScreen, NotificationDemoScreen } from '../../screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Navigation :React.FC= () => {
  return (
    
    <Tab.Navigator
        initialRouteName="Camera"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = '';

            if (route.name === 'Camera') {
              iconName = 'camera-alt';
            } else if (route.name === 'ImagePicker') {
              iconName = 'photo-library';
            }
            if (route.name ==='CrashTest') {
              iconName = 'bug-report';
            }
            if (route.name ==='NotificationDemo') {
              iconName = 'notifications';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
        })}
        
      >
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="ImagePicker" component={ImagePickerScreen} />
        <Tab.Screen name="CrashTest" component={CrashTestScreen} />
        <Tab.Screen name="NotificationDemo" component={NotificationDemoScreen} />
      </Tab.Navigator>
   
  );
};

export default Navigation;