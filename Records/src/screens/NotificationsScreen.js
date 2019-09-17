import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import SingletonClass from './../SingletonClass';
import Notification from './../components/Notification';
import FriendNotification from './../components/FriendNotification';
import RecordNotification from './../components/RecordNotification';
import PaidNotification from './../components/PaidNotification';

import GLOBALS from './../Globals';
import {acceptFriendRequest} from './../FirebaseActions';
import {resetNavigationStack} from './../../App';
import firebase from 'react-native-firebase';
import {sendNotification} from './../FirebaseActions';

class NotificationsScreen extends Component{

  state={resetData: false};

  //Configure header
  static navigationOptions = {
    title: 'Notifications',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //List to hold all the notifications for the flat list
  flatListData = [];

  //Get all notifications from the singleton
  constructor(props){
    super(props);

    const notificationsData = SingletonClass.getInstance().getNotifications();
    for(index = 0; index < notificationsData.length; ++index){
      this.flatListData.push({key: index.toString(), notification: notificationsData[index]});
    }
  }

  //Conditional rendering to choose which type of notification to render
  renderNotificationType(notification){
    const notificationType = notification['data']['type'];
    switch(notificationType){
      case 'friendRequest':
        return(
          <FriendNotification
            notification={notification}
            acceptButtonPressed={()=>{
              this.acceptButtonPressed(notification);
            }}
          />
        );
      case 'record':
        return(
          <RecordNotification
            notification={notification}
            paidButtonPressed={()=>{
              this.paidButtonPressed(notification);
            }}
          />
        );
      case 'payed':
        return(
          <PaidNotification
            notification={notification}
            dismissButtonPressed={()=>{
              this.dismissButtonPressed(notification);
            }}
          />
        );
    }
  }

  //The users pays the notifications, so it deletes the notifications,
  //And it goes into that record from the senders data and turns it into paid,
  //And it reduces the amount the friend owes the sender by the same amount
  paidButtonPressed(notification){

    //Delete the Notification from the user's database
    var filepath =  SingletonClass.getInstance().getUserUID() +
                    "/notifications/" +
                    notification['id'];
    firebase.database().ref(filepath).set(null);

    //Delete the notification from the SingletonClass
    SingletonClass.getInstance().removeNotification(notification);

    //Go to the sender's database and change the record for the user to null
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
    firebase.database().ref(filepath).once('value').then((snapshot)=>{
      const newAmount = snapshot.val() - notification['data']['amount'];
      firebase.database().ref(filepath).set(newAmount);

      //Send a notification to the sender saying the user has payed
      const newNotification = {
        type: 'payed',
        senderUsername: SingletonClass.getInstance().getUsername(),
        senderUID: SingletonClass.getInstance().getUserUID(),
        title: notification['data']['title'],
        amount: notification['data']['amount']

      }
      sendNotification(notification['data']['senderUID'],newNotification).then(()=>{

        //Go back to the home screen
        this.props.navigation.dispatch(resetNavigationStack);
      });
    });
  }

  //The user accepts the friend request so it updates firebase
  acceptButtonPressed = (notification) => {

    //Add the friend to the SinglenClass
    const senderUsername = notification['data']['senderUsername']
    const senderUID = notification['data']['senderUID'];
    SingletonClass.getInstance().addFriend(senderUsername, 0);

    //Update the user's database and then re-render the screen
    acceptFriendRequest(notification).then(()=>{
      this.props.navigation.dispatch(resetNavigationStack);
    })
  }

  //Dismisses the notification that someone payed you
  dismissButtonPressed = (notification) => {

    //Remove from singleton
    SingletonClass.getInstance().removeNotification(notification);

    //Remove from firebase
    const filepath =  SingletonClass.getInstance().getUserUID() +
                      '/notifications/' +
                      notification['id'];
    firebase.database().ref(filepath).set(null);

    //Go back to home screen
    this.props.navigation.dispatch(resetNavigationStack);
  }

  //Controls what each list item looks like
  _renderListItem = ({item}) => (
    <View>
      {this.renderNotificationType(item['notification'])}
    </View>
  );

  render(){
    return(
      <View style={styles.viewStyle}>
        <FlatList
          data={this.flatListData}
          renderItem={this._renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1
  }
});

export default NotificationsScreen;
