import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import './src/i18n';

import Main from './src/screens/main';
import Search from './src/screens/search';
import ProductList from './src/screens/productList';
import Settings from './src/screens/settings';
import ConfirmationCode from './src/screens/confirmationCode';

const Stack = createStackNavigator();

console.disableYellowBox = true;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={Main} options={{title: 'main'}} />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{title: 'search'}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{title: 'product list'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'settings'}}
        />
        <Stack.Screen
          name="ConfirmationCode"
          component={ConfirmationCode}
          options={{title: 'confirmation code'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
