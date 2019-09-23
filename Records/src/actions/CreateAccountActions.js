import {
  ON_EMAIL_CHANGED_CREATE_ACCOUNT,
  ON_USERNAME_CHANGED_CREATE_ACCOUNT,
  ON_PASSWORD_CHANGED_CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_CLOSE_ALERT
} from './types';

import { createAccount } from './../FirebaseActions';
import firebase from 'react-native-firebase';
import SingletonClass from './../SingletonClass';

export const onEmailChangedCreateAccount = (text) => {
  return {
    type: ON_EMAIL_CHANGED_CREATE_ACCOUNT,
    payload: text
  };
};

export const onUsernameChangedCreateAccount = (text) => {
  return {
    type: ON_USERNAME_CHANGED_CREATE_ACCOUNT,
    payload: text
  };
};

export const onPasswordChangedCreateAccount = (text) => {
  return {
    type: ON_PASSWORD_CHANGED_CREATE_ACCOUNT,
    payload: text
  };
};

export const onCreateAccountButtonPressed = (email, username, password, navigation) => {
  return (dispatch) => {
    //Create the account with firebase
    createAccount(email, password, username)
      .then(()=>{
        //Get the user's uid
        const uid = firebase.auth().currentUser.uid;

        //Set Singleton Data
        SingletonClass.getInstance().setUserUID(uid);
        SingletonClass.getInstance().setUsername(username);

        dispatch({type: CREATE_ACCOUNT_SUCCESS});
        navigation.navigate('App');
      })
      .catch((error) => {
        dispatch({
          type: CREATE_ACCOUNT_FAILURE,
          payload: error
        });
      });
  };
};

export const createAccountCloseAlert = () => {
  return {
    type: CREATE_ACCOUNT_CLOSE_ALERT
  };
};
