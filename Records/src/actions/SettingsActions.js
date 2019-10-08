import {
  USER_LOGGED_OUT_SUCCESS
} from './types';

import SingletonClass from './../SingletonClass';
import {firebaseSignOut} from './../FirebaseActions';
import AsyncStorage from '@react-native-community/async-storage';

const _removeLoginCredentials = async () => {
  try{
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
  } catch(error) {
    console.log(error);
  }
};
export const signUserOut = (navigation) => {
  return (dispatch) => {
    //reset all components
    dispatch({ type: USER_LOGGED_OUT_SUCCESS });

    //Clear SingletonClass and Sign out of firebase
    SingletonClass.getInstance().clearSingleton();
    firebaseSignOut().then(()=>{
      _removeLoginCredentials();
      //Go Back to Login Screen
      navigation.navigate('Auth');
    });
  };
};
