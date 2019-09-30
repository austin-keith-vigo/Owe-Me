import {
  NOTIFICATION_PAYED,
  FRIEND_NOTIFICATION_ACCEPTED,
  RECORD_NOTIFICATION_SENT
} from './types';

import SingletonClass from './../SingletonClass';
import { removeNotification, acceptFriendRequest, sendNotification } from './../FirebaseActions';
import firebase from 'react-native-firebase';

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

export const payRecordNotification = (notification) => {
  return (dispatch) => {
    //Delete the Notification from the user's database
    const udid = SingletonClass.getInstance().getUserUID();
    removeNotification(udid, notification.id);

    //Delete the notification from the SingletonClass
    SingletonClass.getInstance().removeNotification(notification);

    //Update the senders record in the database to reflect the user paying them
    filepath =  notification['data']['senderUID'] +
                '/records/' +
                notification['data']['title'] +
                '/' +
                SingletonClass.getInstance().getUsername();
    firebase.database().ref(filepath).set(null);

    //Go to the sender's database and change the friends data for the user's amount owed
    filepath =  notification['data']['senderUID'] +
                '/friends/' +
                SingletonClass.getInstance().getUsername();
    firebase.database().ref(filepath).once('value')
      .then((snapshot)=>{
        var newAmount = snapshot.val() - notification['data']['amount'];
        newAmount = Number(newAmount.toFixed(2))
        firebase.database().ref(filepath).set(newAmount);

        //Send a notification to the sender saying the user has payed
        const newNotification = {
          type: 'payed',
          senderUsername: SingletonClass.getInstance().getUsername(),
          senderUID: SingletonClass.getInstance().getUserUID(),
          title: notification['data']['title'],
          amount: notification['data']['amount']
        };
        sendNotification(notification['data']['senderUID'],newNotification)
          .then(()=>{
            dispatch({
              type: RECORD_NOTIFICATION_SENT,
              payload: SingletonClass.getInstance().getNotifications()
            });
          });
      });
  };
};
