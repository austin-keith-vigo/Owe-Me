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
import CreateAccountScreen from './src/screens/CreateAccountScreen';

//Main App Navigator for all the screens
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen
  },
  {
    initialRouteName: 'Login',
  }
);

const App = createAppContainer(AppNavigator);
export default App;
