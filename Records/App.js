import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StackActions, NavigationActions } from 'react-navigation';
import GLOBALS from './src/Globals';

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
import NotificationsScreen from './src/screens/NotificationsScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import SettingsScreen from './src/screens/SettingsScreen';

//Main App Navigator for all the screens
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    CheckEmail: CheckEmailScreen,
    CreateAccount: CreateAccountScreen
  },
  {
    initialRouteName: "Login"
  }
);
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddRecord: AddRecordScreen,
    SelectFriends: SelectFriendsScreen,
    Confirmation: ConfirmationScreen
  },
  {
    initailRouteName: "Home"
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Settings"
  }
);
const FriendsStack = createStackNavigator(
  {
    Friends: FriendsScreen,
    AddFriends: AddFriendScreen
  },
  {
    initialRouteName: "AddFriends"
  }
);
const NotificationsStack = createStackNavigator(
  {
    Notifications: NotificationsScreen
  },
  {
    initialRouteName: "Notifications"
  }
);
const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Friends: FriendsStack,
    Notifications: NotificationsStack,
    Settings:SettingsStack
  },
  {
    tabBarOptions: {
      initialRouteName: "Home"
    }
  }

);
const App = createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
)

//Resets Navigator back to Home Screen
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

// const App = createAppContainer(AppNavigator);
export {
  App,
  resetAction
};
