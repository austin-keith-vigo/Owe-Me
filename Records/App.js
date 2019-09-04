import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const App = createAppContainer(AppNavigator);
export default App;
