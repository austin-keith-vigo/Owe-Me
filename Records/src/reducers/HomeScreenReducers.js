import React from 'react';
import Record from './../Record';

import {
  LOGIN_USER_SUCCESS,
  USER_LOGGED_OUT_SUCCESS,
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
  ADDED_NEW_RECORD_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
  records: [],
  title: '',
  amount: '',
  error: false,
  errorMessage: '',
  newRecord: null,
  errorSelectFriends: false,
  errorMessageSelectFriends: '',
  selectedFriends: []
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
      return {
        ...state,
        error:false,
        errorMessage:'',
        newRecord: action.payload
      };
    case CREATE_RECORD_FAILURE:
      return {...state, error: true, errorMessage: action.payload};
    case CLOSE_ALERT_ADD_RECORD:
      return {...state, error: false, errorMessage: ''};
    case ADD_SELECTED_FRIEND:
      return {...state, selectedFriends: action.payload};
    case REMOVE_SELECTED_FRIEND:
      return {...state, selectedFriends: action.payload};
    case ERROR_NO_SELECTED_FRIENDS:
      return {
        ...state,
        errorSelectFriends: true,
        errorMessageSelectFriends: action.payload
      };
    case CLOSE_ERROR_SELECT_FRIENDS:
      return {
        ...state,
        errorSelectFriends: false,
        errorMessageSelectFriends: ''
      };
    case SELECT_FRIENDS_SUCCESS:
      return {
        ...state,
        title: '',
        newRecord: action.payload
      };
    case ADDED_NEW_RECORD_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        records: action.payload
      };
    default:
      return {...state};
  };
};
