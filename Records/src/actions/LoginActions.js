import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CLOSE_ERROR_MESSAGE
} from './types';
import firebase from 'react-native-firebase';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = (email, password, navigation) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('successful login');
        dispatch({type: LOGIN_USER_SUCCESS});
        navigation.navigate('App');
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: error.message
        });
      });
  };
};

export const closeErrorMessage = () => {
  return {
    type: CLOSE_ERROR_MESSAGE
  };
};
