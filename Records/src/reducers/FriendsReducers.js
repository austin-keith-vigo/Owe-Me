import {
  LOGIN_USER_SUCCESS,
  GOT_NON_FRIENDS,
  UPDATED_SEARCH_VALUE,
  UPDATED_FOUND_USERNAMES,
  CHANGED_SELECTED_FRIEND_ROW,
  ADDED_NEW_RECORD_SUCCESS,
  SENT_REQUEST,
  USER_LOGGED_OUT_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
  friends: [],
  nonFriends: [],
  searchValue: '',
  foundUsernames: [],
  selectedFriendRow: null,
  usersRequested: []
};

import SingletonClass from './../SingletonClass';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, friends: action.payload.friends};
    case ADDED_NEW_RECORD_SUCCESS:
      return {...state, friends: SingletonClass.getInstance().getFriends()}
    case GOT_NON_FRIENDS:
      return {...state, nonFriends: action.payload};
    case UPDATED_SEARCH_VALUE:
      return {...state, searchValue: action.payload};
    case UPDATED_FOUND_USERNAMES:
      return {...state, foundUsernames: action.payload};
    case CHANGED_SELECTED_FRIEND_ROW:
      return {...state, selectedFriendRow: action.payload};
    case SENT_REQUEST:
      return {...state, usersRequested: action.payload}
    case USER_LOGGED_OUT_SUCCESS:
      return {...state, ...INITIAL_STATE};
    default:
      return {...state};
  };
};
