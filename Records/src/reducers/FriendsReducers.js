import {
  LOGIN_USER_SUCCESS,
  GOT_NON_FRIENDS
} from './../actions/types';

const INITIAL_STATE = {
  friends: [],
  nonFriends: []
};

export default (state, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, friends: action.payload.friends};
    case GOT_NON_FRIENDS:
      return {...state, nonFriends: action.payload};
    default:
      return {...state, ...INITIAL_STATE};
  };
};
