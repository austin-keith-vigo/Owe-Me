import {
  LOGIN_USER_SUCCESS,
  USER_LOGGED_OUT_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
  notifications: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, notifications: action.payload.notifications};
    case USER_LOGGED_OUT_SUCCESS:
      return {...state, ...INITIAL_STATE}
    default:
      return {...state};
  }
};
