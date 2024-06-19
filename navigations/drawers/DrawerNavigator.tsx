import React, {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomTabNavigator} from '..';
import {TestScreen} from '../../screens';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomePage" component={BottomTabNavigator} />
      <Drawer.Screen name="Random Quotes" component={TestScreen} />
    </Drawer.Navigator>
  );
}
