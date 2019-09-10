import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions, NavigationActions } from 'react-navigation';

//Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import CheckEmailScreen from './src/screens/CheckEmailScreen';
import RecordScreen from './src/screens/RecordScreen';
import AddRecordScreen from './src/screens/AddRecordScreen';
import AddFriendScreen from './src/screens/AddFriendScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import SelectFriendsScreen from './src/screens/SelectFriendsScreen';

//Main App Navigator for all the screens
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
    ForgotPassword: ForgotPasswordScreen,
    CheckEmail: CheckEmailScreen,
    Record: RecordScreen,
    AddRecord: AddRecordScreen,
    AddFriend: AddFriendScreen,
    Friends: FriendsScreen,
    SelectFriends: SelectFriendsScreen
  },
  {
    initialRouteName: 'Login',
  }
);

//Resets Navigator back to Home Screen
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

const App = createAppContainer(AppNavigator);
export {
  App,
  resetAction
};
