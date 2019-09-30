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
import { connect } from 'react-redux';

import GLOBALS from './../Globals';
import {acceptFriendRequest} from './../FirebaseActions';
import {resetNavigationStack} from './../../App';
import firebase from 'react-native-firebase';
import {sendNotification} from './../FirebaseActions';

class NotificationsScreen extends Component{

  state={resetData: false};

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //Conditional rendering to choose which type of notification to render
  renderNotificationType(notification, notifications){
    const notificationType = notification['data']['type'];
    switch(notificationType){
      case 'friendRequest':
        return(
          <FriendNotification
            notifications={notifications}
            notification={notification}
          />
        );
      case 'record':
        return(
          <RecordNotification
            notifications={notifications}
            notification={notification}
          />
        );
      case 'payed':
        return(
          <PaidNotification
            notifications={notifications}
            notification={notification}
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

      }
      sendNotification(notification['data']['senderUID'],newNotification).then(()=>{

        //Go back to the home screen
        this.props.navigation.dispatch(resetNavigationStack);
      });
    });
  }

  //Renders list item
  renderItem(item, notifications){
    return(
      <View>
        {this.renderNotificationType(item, notifications)}
      </View>
    );
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <FlatList
          data={this.props.notifications}
          renderItem={({item,index}) => this.renderItem(item, this.props.notifications)}
          keyExtractor={(item) => item.id}
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

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notifications
  };
};

export default connect(mapStateToProps)(NotificationsScreen);
