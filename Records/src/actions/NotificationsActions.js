import {
  NOTIFICATION_PAYED,
  FRIEND_NOTIFICATION_ACCEPTED
} from './types';

import SingletonClass from './../SingletonClass';
import { removeNotification, acceptFriendRequest } from './../FirebaseActions';

export const dismissPaidNotification = (notification, notifications) => {
  //Remove the notification from Firebase.
  const udid = SingletonClass.getInstance().getUserUID();
  removeNotification(udid, notification.id);

  //Remove the notification from Singleton
  SingletonClass.getInstance().removeNotification(notification);

  return {
    type: NOTIFICATION_PAYED,
    payload: SingletonClass.getInstance().getNotifications()
  };
};

export const acceptFriendNotification = (notification) => {
  return (dispatch) => {
    //Remove the notification from Firebase
    const udid = SingletonClass.getInstance().getUserUID();
    removeNotification(udid, notification.id);

    //Add the friend to the Database
    acceptFriendRequest(notification).then(()=>{
      //Add the Friend to the singleton
      const senderUsername = notification['data']['senderUsername']
      const senderUID = notification['data']['senderUID'];
      SingletonClass.getInstance().addFriend(senderUsername, 0);

      //update components
      dispatch({
        type: FRIEND_NOTIFICATION_ACCEPTED,
        payload: SingletonClass.getInstance().getNotifications()
      });
    });
  };
};
