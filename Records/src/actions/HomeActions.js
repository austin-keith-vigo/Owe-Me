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

export const createRecord = (title, amount, navigation) => {
  //All fields are not filled out
  if (amount == '' || title == ""){
    console.log('fail');
    return {
      type: CREATE_RECORD_FAILURE,
      payload: 'Please fill out all fields.'
    };
  }

  //Check amount is a number
  var amount = Number(amount);
  if (Number.isNaN(amount)){
    console.log('fail');
    return {
      type: CREATE_RECORD_FAILURE,
      payload: 'Amount must be a number.'
    }
  }

  //Create the new record
  // var newRecord = new Record(title, {});
  // var parameters = {
  //   totalAmount: amount,
  //   record: newRecord
  // };
  // this.props.navigation.navigate("SelectFriends",parameters);


  return {
    type: CREATE_RECORD_SUCCESS,
    payload: {
      recordTitle: title,
      recordAmount: amount
    }
  };
};

export const closeAlertAddRecord = () => {
  return {
    type: CLOSE_ALERT_ADD_RECORD
  };
};
