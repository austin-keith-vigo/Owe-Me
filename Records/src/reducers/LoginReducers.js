import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CLOSE_ERROR_MESSAGE,
  START_LOGGING_IN,
  USER_LOGGED_OUT_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: false,
  errorMessage: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case START_LOGGING_IN:
      return {...state, loading: true}
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE};
    case LOGIN_USER_FAILURE:
      return {...state, error: true, errorMessage: action.payload, loading: false};
    case CLOSE_ERROR_MESSAGE:
      return {...state, error: false, errorMessage: ''};
    case USER_LOGGED_OUT_SUCCESS:
      return {...state, ...INITIAL_STATE};
    default:
      return {...state};
  }
}
