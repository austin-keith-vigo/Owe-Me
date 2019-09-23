import {
  ON_EMAIL_CHANGED_CREATE_ACCOUNT,
  ON_USERNAME_CHANGED_CREATE_ACCOUNT,
  ON_PASSWORD_CHANGED_CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_CLOSE_ALERT
} from './../actions/types';

const INITIAL_STATE = {
  email: '',
  username: '',
  password: '',
  error: false,
  errorMessage: ''
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type){
    case ON_EMAIL_CHANGED_CREATE_ACCOUNT:
      return {...state, email: action.payload};
    case ON_USERNAME_CHANGED_CREATE_ACCOUNT:
      return {...state, username: action.payload};
    case ON_PASSWORD_CHANGED_CREATE_ACCOUNT:
      return {...state, password: action.payload};
    case CREATE_ACCOUNT_SUCCESS:
      return {...state, ...INITIAL_STATE};
    case CREATE_ACCOUNT_FAILURE:
      return {...state, error: true, errorMessage: action.payload};
    case CREATE_ACCOUNT_CLOSE_ALERT:
      return {...state, error: false, errorMessage: ''};
    default:
      return {...state};
  };
};