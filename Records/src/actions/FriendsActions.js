import {
  GOT_NON_FRIENDS,
  UPDATED_SEARCH_VALUE,
  UPDATED_FOUND_USERNAMES,
  CHANGED_SELECTED_FRIEND_ROW
} from './types';

import SingletonClass from './../SingletonClass';
import {getAllUsernames} from './../FirebaseActions';

export const getNonFriends = (friends, navigation) => {
  return (dispatch) => {
    getAllUsernames()
      .then((value) => {

        //Get the usernames of everyone not a friend
        var nonFriends = [];
        Object.values(value.users).forEach((userData)=>{
          username = userData['username']
          if (friends[username] == undefined) {
            nonFriends.push(username);
          };
        });

        //take out the the person's own username
        var nonFriendsFinal = [];
        const usersUsername = SingletonClass.getInstance().getUsername();
        for(index = 0; index < nonFriends.length; ++index){
          if(nonFriends[index] != usersUsername){
            nonFriendsFinal.push(nonFriends[index]);
          }
        };

        dispatch({
          type: GOT_NON_FRIENDS,
          payload: nonFriendsFinal
        });

        navigation.navigate('AddFriends');
      });
  };
};

//Return all usernames with the substr
export const updateSearchValue = (text, nonFriends) => {

  return (dispatch) => {

    //update search value
    dispatch({type: UPDATED_SEARCH_VALUE, payload: text});

    //filter usernames with given value
    var foundUsernames = [];
    nonFriends.forEach((username) => {
      if (username.includes(text)){
        foundUsernames.push(username);
      };
    });

    dispatch({type: UPDATED_FOUND_USERNAMES, payload: foundUsernames});
  }
};

export const changeSelectedFriendRow = (friendName) => {
  return {
    type: CHANGED_SELECTED_FRIEND_ROW,
    payload: friendName
  };
};
