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
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
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
import SendFriendRequestScreen from './src/screens/SendFriendRequestScreen';

//Different Stack navigators used within the main switch and tab navigators
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
    Confirmation: ConfirmationScreen,
    Record: RecordScreen
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
    AddFriends: AddFriendScreen,
    SendFriendRequest: SendFriendRequestScreen
  },
  {
    initialRouteName: "Friends"
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

//Tab Navigator
const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Friends: FriendsStack,
    Notifications: NotificationsStack,
    Settings: SettingsStack
  },
  {
    tabBarOptions: {
      initialRouteName: "Home",
      activeTintColor: GLOBALS.COLORS.GREEN,
      inactiveTintColor: 'gray',
    }
  }
);

//Main App navigation container
const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);

const App = () => {
  return(
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <Navigator/>
    </Provider>
  );
};

//Resets Navigator back to Home Screen
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })]
});


const resetNavigationStack = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Notifications'})]
})

export {
  App,
  resetAction,
  resetNavigationStack
};
