import {
  LOGIN_USER_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
  records: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGIN_USER_SUCCESS:
      return {...state, records: action.payload};
    default:
      return {...state};
  };
};
