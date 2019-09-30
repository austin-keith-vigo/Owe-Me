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

//Signs the user out of the App
const firebaseSignOut = () => {
  return new Promise(function(resolve, reject) {
    firebase.auth().signOut().then(function() {
      //Sign out succesful
      resolve();
    }).catch(function(error) {
      //Sign out unsuccesfult
      reject(error.message);
    });
  });
}

//Creates an account with firebase
const createAccount = (email, password, username) => {
  return new Promise(function(resolve, reject) {

    //Check if the username has any invalid characters
    let re = new RegExp("^[0-9A-Za-z]*$");
    if(re.test(username) == false){
      reject("invalid character(s) in username. Only letters and numbers are valid");
    }

    //Check if the username is taken
    firebase.database().ref('usernames').once('value').then((snapshot)=>{
      var index = 0;
      const usernames = Object.keys(snapshot.val());
      while(index < usernames.length && usernames[index] != username.toString()){
        ++index;
      }

      //The username was found
      if (index < usernames.length){
        reject("Username already exists")
      }

      //Create an account for the user
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{

        //Default the user's database data
        const userData ={
          username: username,
          friends: "",
          notifications: "",
          records: ""
        };
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref(uid).set(userData);
        firebase.database().ref('usernames/' + username).set(uid);

        //Account created
        resolve();
      })
      .catch((error)=>{
        reject(error.message);
      });
    });
  });
}

const getUsersUDID = (username) => {
  return new Promise((resolve, reject) => {
    const filepath = 'usernames/' + username.toString();
    firebase.database().ref(filepath).once('value')
      .then((snapshot)=> {
        resolve({udid: snapshot.val()});
      })
  });
};

const removeNotification = (udid, notificationId) => {
  return new Promise((resolve, reject) => {
    const filepath = udid + '/notifications/' + notificationId;
    firebase.database().ref(filepath).set(null);
    resolve();
  });
}

export {
  willUpdateWithNewRecord,
  getAllUsernames,
  sendNotification,
  acceptFriendRequest,
  firebaseSignOut,
  createAccount,
  getUsersUDID,
  removeNotification
}
