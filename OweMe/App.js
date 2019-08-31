import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const App = createAppContainer(AppNavigator);
export default App;
