import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CLOSE_ERROR_MESSAGE,
  START_LOGGING_IN,
  UPDATE_DATA_FROM_DATABASE
} from './types';

import Record from './../Record';
import firebase from 'react-native-firebase';
import SingletonClass from './../SingletonClass';
import AsyncStorage from '@react-native-community/async-storage';

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

//A promise that the Singleon will be initialized.
//Is a promise to make sure the app does not move on to anymore pages until
//Singleton is initialized.
const willInitializeSingleton = (dispatch) => {
  return new Promise(function(resolve, reject) {
    SingletonClass.getInstance().setUserUID(firebase.auth().currentUser.uid);
    var filepath = SingletonClass.getInstance().getUserUID();
    var databaseRef = firebase.database().ref(filepath);

    databaseRef.on('value', (snapshot) => {

      //Clear the singleton because it will be reset.
      SingletonClass.getInstance().clearSingleton();

      //Set singleton username and UID
      SingletonClass.getInstance().setUsername(snapshot.val()['username']);

      //Set SingletonRecords
      const recordsData = snapshot.val()['records'];
      for (var key in recordsData){
        var newRecord = new Record(key, recordsData[key]);
        SingletonClass.getInstance().addRecord(newRecord);
      }

      //Set Singleton friends
      const friendsData = snapshot.val()['friends'];
      for (var key in friendsData){
        SingletonClass.getInstance().addFriend(key, friendsData[key]);
      }

      //Set Notifications
      const notificationsData = snapshot.val()['notifications'];
      for(var key in notificationsData){
        SingletonClass.getInstance().addNotification(key, notificationsData[key]);
      }

      //Call an update for all states to re-render the app to reflect changes
      dispatch({type:UPDATE_DATA_FROM_DATABASE})
      resolve('Completed');
    });
    // .catch((error)=>{
    //   reject(error.messsage);
    // });
  });
};

const _storeLoginCredentials = async (email, password) => {
  try {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
    console.log('stored');
  } catch (error) {
    console.log('error');
  }
};

export const loginUser = (email, password, navigation) => {
  return (dispatch) => {

    dispatch({type: START_LOGGING_IN});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        //Initialize the Singleton before moving on
        _storeLoginCredentials(email, password);
        willInitializeSingleton(dispatch)
          .then(()=> {
            dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: {
                records:[...SingletonClass.getInstance().getRecords()],
                friends: SingletonClass.getInstance().getFriends(),
                notifications: SingletonClass.getInstance().getNotifications()
              }
            });
            navigation.navigate('App');
          })
          .catch((error)=> {
            dispatch({
              type: LOGIN_USER_FAILURE,
              payload: error.message
            });
          });
      })
      .catch((error) => {
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
