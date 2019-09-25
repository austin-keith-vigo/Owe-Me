import {
  GOT_NON_FRIENDS
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

        console.log(nonFriendsFinal, nonFriends);
        dispatch({
          type: GOT_NON_FRIENDS,
          payload: nonFriendsFinal
        });

        navigation.navigate('AddFriends');
      });
  };
};
