import React from 'react';
import Record from './../Record';

import SingletonClass from './../SingletonClass';
import { willUpdateWithNewRecord } from './../FirebaseActions';
import { resetAction } from './../../App';

import {
  TITLE_TEXT_CHANGED,
  AMOUNT_TEXT_CHANGED,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE,
  CLOSE_ALERT_ADD_RECORD,
  ADD_SELECTED_FRIEND,
  REMOVE_SELECTED_FRIEND,
  ERROR_NO_SELECTED_FRIENDS,
  CLOSE_ERROR_SELECT_FRIENDS,
  SELECT_FRIENDS_SUCCESS,
  ADDED_NEW_RECORD_SUCCESS,
  BACK_BUTTTON_PRESSED_ADD_RECORD,
  ON_BACK_BUTTON_PRESSED_SELECT_FRIENDS
} from './types';

export const onBackButtonPressedAddRecord = (navigation) => {
  navigation.pop();
  return {
    type: BACK_BUTTTON_PRESSED_ADD_RECORD
  };
};

export const onTitleTextChanged = (text) => {
  return {
    type: TITLE_TEXT_CHANGED,
    payload: text
  };
};

export const onAmountTextChanged = (text) => {
  return {
    type: AMOUNT_TEXT_CHANGED,
    payload: text
  };
};

//Helper method for createRecord to check if the title is taken
const titleIsTaken = (title, records) => {
  for (index = 0; index < records.length; ++index){
    if (title == records[index].getTitle()) {
      return true;
    }
  }

  return false;
}

//Creates a record to be passed to the next screen for completion
export const createRecord = (title, amount, navigation, records) => {
  //All fields are not filled out
  if (amount == '' || title == ""){
    return {
      type: CREATE_RECORD_FAILURE,
      payload: 'Please fill out all fields.'
    };
  }

  //Check amount is a number
  var amount = Number(amount);
  if (Number.isNaN(amount)){
    return {
      type: CREATE_RECORD_FAILURE,
      payload: 'Amount must be a number.'
    }
  }

  //Check if the title is already taken
  if(titleIsTaken(title, records) == true){
    return {
      type: CREATE_RECORD_FAILURE,
      payload: 'Title already in use.'
    }
  }

  //Start the new record and move to next screen
  navigation.navigate('SelectFriends');
  var newRecord = new Record(title, {});
  return {
    type: CREATE_RECORD_SUCCESS,
    payload:  newRecord
  };
};

export const closeAlertAddRecord = () => {
  return {
    type: CLOSE_ALERT_ADD_RECORD
  };
};

export const onBackButtonPressedSelectFriends = (navigation) => {
  navigation.pop();
  return {
    type: ON_BACK_BUTTON_PRESSED_SELECT_FRIENDS
  };
}

export const addSelectedFriend = (selectedFriend, selectedFriends) => {
  var newSelectedFriends = [...selectedFriends];
  newSelectedFriends.push(selectedFriend);
  return {
    type: ADD_SELECTED_FRIEND,
    payload: newSelectedFriends
  };
};

export const removeSelectedFriend = (selectedFriend, selectedFriends) => {
  var newSelectedFriends = [];
  for(index = 0; index < selectedFriends.length; ++index) {
    if(selectedFriend != selectedFriends[index]) {
      newSelectedFriends.push(selectedFriends[index]);
    };
  };

  return {
    type: REMOVE_SELECTED_FRIEND,
    payload: newSelectedFriends
  };
};

//passes on the selected friends to next screen to finalize new record
export const buttonPressedSelectFriends = (newRecord, selectedFriends, amount, navigation) => {
  if(selectedFriends.length == 0) {
    return {
      type: ERROR_NO_SELECTED_FRIENDS,
      payload: 'No friends selected.'
    };
  };

  //Make the record and update the states
  var amountPerPerson = (amount / (selectedFriends.length + 1));
  amountPerPerson = Number(amountPerPerson.toFixed(2));
  const recordData = {};
  for (index = 0; index < selectedFriends.length; ++index){
    recordData[selectedFriends[index]] = amountPerPerson;
  };
  newRecord.setData(recordData);

  //Go to the next screen
  navigation.navigate('Confirmation');

  return {
    type: SELECT_FRIENDS_SUCCESS,
    payload: newRecord
  };
};

export const closeAlertSelectFriends = () => {
  return {
    type: CLOSE_ERROR_SELECT_FRIENDS
  };
};

//Confirms the new record and updates singleton and firebase
export const confirmButtonPressed = (newRecord, navigation) => {
  return (dispatch) => {

    //Update the Singleton
    SingletonClass.getInstance().addNewRecord(newRecord);

    //Update Firebase
    willUpdateWithNewRecord(newRecord)
      .then(()=>{
        dispatch({
          type: ADDED_NEW_RECORD_SUCCESS,
          payload: [...SingletonClass.getInstance().getRecords()]
        });
        navigation.dispatch(resetAction);
      });
  };
};
