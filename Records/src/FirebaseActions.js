import firebase from 'react-native-firebase';
import SingletonClass from './SingletonClass';

//Given a new record will update the user's records data
//And how much their friends owe them
const willUpdateWithNewRecord = (record) => {
  return new Promise((resolve, reject) => {

    //Set Record Data
    const userUID = SingletonClass.getInstance().getUserUID();
    const recordTitle = record.getTitle();
    const recordsFilepath = userUID + '/records/' + recordTitle;

    //Set the new record data for the user
    const recordData = record.getData();
    firebase.database().ref(recordsFilepath).set(recordData);

    //Update Global friend amounts in database
    const friendsFilepath = userUID + '/friends';
    const friendsData = SingletonClass.getInstance().getFriends();
    firebase.database().ref(friendsFilepath).set(friendsData);

    //Update friends firebase database
    willUpateFriendsRecordData(record);

    resolve();
  });
}

//Go through each friend in the record object and Update
//their records with the new owed amount to the user
const willUpateFriendsRecordData = (record) => {
  return new Promise((resolve, reject) => {
    var uids = {};

    //Grab the users' friend's userUID's
    firebase.database().ref('usernames').once('value').then((snapshot)=>{
      uids = snapshot.val();

      //Create and send a notification to each friend
      for(key in record.getData()){
        const notification = {
          type: "record",
          senderUsername: SingletonClass.getInstance().getUsername(),
          senderUID: SingletonClass.getInstance().getUserUID(),
          title: record.getTitle(),
          amount: record.getAmountForPerson(key)
        };

        var filepath = uids[key] + '/notifications';
        const newPostKey = firebase.database().ref(filepath).push().key;
        firebase.database().ref(filepath +'/' + newPostKey).set(notification);
      }
    });
  });
}

const getAllUsernames = () => {
  return new Promise(function(resolve, reject) {
    firebase.database().ref('usernames').once('value').then((snapshot)=>{
      var usersData = [];
      for(key in snapshot.val()){
        usersData.push({username: key, uid: snapshot.val()[key]});
      }
      resolve({users: usersData});
    });

  });
}

//Sends a notification to the given UserUID
const sendNotification = (userUID, notification) => {
  return new Promise(function(resolve, reject) {
    const filepath = userUID + '/notifications';
    const newPostKey = firebase.database().ref(filepath).push().key;
    firebase.database().ref(filepath +'/' + newPostKey).set(notification);
    resolve();
  });
}

//When the user accepts the friend Request
const acceptFriendRequest = (notification) => {
  return new Promise(function(resolve, reject) {

    //Go to the user's database and add the sender as a friends
    var filepath = SingletonClass.getInstance().getUserUID() +
                  "/friends/" +
                  notification['data']['senderUsername'];
    firebase.database().ref(filepath).set(0);

    //Go to the sender's data and add this user to their database
    filepath =  notification['data']['senderUID'] +
                "/friends/" +
                SingletonClass.getInstance().getUsername();
    firebase.database().ref(filepath).set(0);

    //Delete the notification from the Singleton
    SingletonClass.getInstance().removeNotification(notification);

    //Delete the notification from the user's database
    filepath =  SingletonClass.getInstance().getUserUID() +
                "/notifications/" +
                notification['id'];
    firebase.database().ref(filepath).set(null);

    resolve();
  });
}

export {
  willUpdateWithNewRecord,
  getAllUsernames,
  sendNotification,
  acceptFriendRequest
}
