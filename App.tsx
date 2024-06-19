import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator, BottomTabNavigator} from './navigations';
import {AppProvider} from './context';
// import store from './store/store';
// import {Provider} from 'react-redux';

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppProvider>
    // <NavigationContainer>
    //   <BottomTabNavigator />
    // </NavigationContainer>
  );
}

export default App;
