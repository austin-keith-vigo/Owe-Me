import React from 'react';
import Record from './../Record';
import SingletonClass from './../SingletonClass';

import {
  TITLE_TEXT_CHANGED,
  AMOUNT_TEXT_CHANGED,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE,
  CLOSE_ALERT_ADD_RECORD
} from './types';

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
    payload: newRecord
  };
};

export const closeAlertAddRecord = () => {
  return {
    type: CLOSE_ALERT_ADD_RECORD
  };
};
