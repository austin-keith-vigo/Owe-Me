import {
  EMAIL_CHANGED_FORGOT_PASSWORD,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  CLOSE_ERROR_MESSAGE_FORGOT_PASSWORD
} from './../actions/types';

const INITIAL_STATE = {
  email: '',
  error: false,
  errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED_FORGOT_PASSWORD:
      return {...state, email: action.payload};
    case SEND_EMAIL_SUCCESS:
      return {...state, ...INITIAL_STATE};
    case SEND_EMAIL_FAILURE:
      return {...state, error: true, errorMessage: action.payload};
    case CLOSE_ERROR_MESSAGE_FORGOT_PASSWORD:
      return {...state, error: false, errorMessage: ''};
    default:
      return {...state};
  }
};
