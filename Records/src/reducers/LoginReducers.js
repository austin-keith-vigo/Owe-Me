import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CLOSE_ERROR_MESSAGE
} from './../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: false,
  errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE};
    case LOGIN_USER_FAILURE:
      return {...state, error: true, errorMessage: action.payload};
    case CLOSE_ERROR_MESSAGE:
      return {...state, error: false, errorMessage: ''};
    default:
      return {...state};
  }
}
