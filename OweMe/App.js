import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Splash: SplashScreen
  },
  {
    initialRouteName: 'Splash',
  }
);

const App = createAppContainer(AppNavigator);
export default App;
