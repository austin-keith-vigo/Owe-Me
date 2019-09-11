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
          sender: SingletonClass.getInstance().getUsername(),
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

export {
  willUpdateWithNewRecord
}