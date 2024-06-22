import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from '..';
import {
  HomeScreen,
  Page1,
  TestScreen,
  ValidateLoginScreen,
} from '../../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name === 'HomePage') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'RandomQuotes') {
            iconName = focused ? 'prism' : 'prism-outline';
          } else if (route.name === 'Passing Data') {
            iconName = focused ? 'radio-button-on' : 'radio-button-off-outline';
          } else if (route.name === 'Login') {
            iconName = 'prism';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="RandomQuotes" component={TestScreen} />
      <Tab.Screen name="HomePage" component={HomeScreen} />
      <Tab.Screen name="Passing Data" component={Page1} />
      <Tab.Screen name="Login" component={ValidateLoginScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
