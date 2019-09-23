import React from 'react';
import Record from './../Record';

import {
  LOGIN_USER_SUCCESS,
  USER_LOGGED_OUT_SUCCESS,
  TITLE_TEXT_CHANGED,
  AMOUNT_TEXT_CHANGED,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE,
  CLOSE_ALERT_ADD_RECORD
} from './../actions/types';

const INITIAL_STATE = {
  records: [],
  title: '',
  amount: '',
  error: false,
  errorMessage: '',
  newRecord: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGIN_USER_SUCCESS:
      return {...state, records: action.payload};
    case USER_LOGGED_OUT_SUCCESS:
      return {...state, ...INITIAL_STATE};
    case TITLE_TEXT_CHANGED:
      return {...state, title: action.payload};
    case AMOUNT_TEXT_CHANGED:
      return {...state, amount: action.payload};
    case CREATE_RECORD_SUCCESS:
      console.log(action.payload);
      return {...state, error:false, errorMessage:'', newRecord: action.payload};
    case CREATE_RECORD_FAILURE:
      return {...state, error: true, errorMessage: action.payload};
    case CLOSE_ALERT_ADD_RECORD:
      return {...state, error: false, errorMessage: ''};
    default:
      return {...state};
  };
};
