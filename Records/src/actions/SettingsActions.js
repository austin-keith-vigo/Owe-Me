import {
  USER_LOGGED_OUT_SUCCESS
} from './types';

import SingletonClass from './../SingletonClass';
import {firebaseSignOut} from './../FirebaseActions';

export const signUserOut = () => {
  return (dispatch) => {
    //reset all components
    dispatch({ type: USER_LOGGED_OUT_SUCCESS });

    //Clear SingletonClass and Sign out of firebase
    SingletonClass.getInstance().clearSingleton();
    firebaseSignOut().then(()=>{
      //Go Back to Login Screen
      this.props.navigation.navigate('Auth');
    });
  };
};
