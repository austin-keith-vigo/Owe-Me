import {
  LOGIN_USER_SUCCESS,
  USER_LOGGED_OUT_SUCCESS,
  NOTIFICATION_PAYED,
  FRIEND_NOTIFICATION_ACCEPTED,
  RECORD_NOTIFICATION_SENT,
  UPDATE_DATA_FROM_DATABASE
} from './../actions/types';
import SingletonClass from './../SingletonClass';

const INITIAL_STATE = {
  notifications: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DATA_FROM_DATABASE:
      console.log('updated notifications');
      return {...state, notifications: [...SingletonClass.getInstance().getNotifications()]};
    case LOGIN_USER_SUCCESS:
      return {...state, notifications: action.payload.notifications};
    case USER_LOGGED_OUT_SUCCESS:
      return {...state, ...INITIAL_STATE}
    case NOTIFICATION_PAYED:
      return {...state, notifications: action.payload};
    case FRIEND_NOTIFICATION_ACCEPTED:
      return {...state, notifications: action.payload};
    case RECORD_NOTIFICATION_SENT:
      return {...state, notifications: action.payload};
    default:
      return {...state};
  }
};
