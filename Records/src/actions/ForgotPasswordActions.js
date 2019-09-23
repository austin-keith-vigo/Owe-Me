import {
  EMAIL_CHANGED_FORGOT_PASSWORD,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  CLOSE_ERROR_MESSAGE_FORGOT_PASSWORD
} from './types';

import firebase from 'react-native-firebase';

export const emailChangedForgotPassword = (text) => {
  return {
    type: EMAIL_CHANGED_FORGOT_PASSWORD,
    payload: text
  };
};

export const sendForgotPasswordEmail = (email, navigation) => {
  return (dispatch) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        dispatch({type: SEND_EMAIL_SUCCESS});
        navigation.navigate('CheckEmail');
      })
      .catch((error) => {
        dispatch({
          type: SEND_EMAIL_FAILURE,
          payload: error.message
        });
      });
  };
};

export const closeAlertForgotPassword = () => {
  return {
    type: CLOSE_ERROR_MESSAGE_FORGOT_PASSWORD
  };
};
