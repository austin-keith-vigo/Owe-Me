import {
  LOGIN_USER_SUCCESS,
  GOT_NON_FRIENDS,
  UPDATED_SEARCH_VALUE
} from './../actions/types';

const INITIAL_STATE = {
  friends: [],
  nonFriends: [],
  searchValue: '',
  foundUsernames: []
};

export default (state, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, friends: action.payload.friends};
    case GOT_NON_FRIENDS:
      return {...state, nonFriends: action.payload};
    case UPDATED_SEARCH_VALUE:
      return {...state, searchValue: action.payload};
    case 'test':
      return {...state, foundUsernames: action.payload};
    default:
      return {...state, ...INITIAL_STATE};
  };
};
