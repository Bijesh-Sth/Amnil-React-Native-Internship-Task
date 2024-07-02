import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CarouselScreen} from '../../screens';

import {
  
} from '../../screens';
import { AuthStackNavigator  } from '../';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } 
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={CarouselScreen} />
      <Tab.Screen name="Profile" component={AuthStackNavigator} />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
