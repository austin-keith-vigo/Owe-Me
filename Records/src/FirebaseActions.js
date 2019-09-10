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

    resolve();
  });
}

export {
  willUpdateWithNewRecord
}
