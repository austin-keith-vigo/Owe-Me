import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import SingletonClass from './../SingletonClass';
import Notification from './../components/Notification';

class NotificationsScreen extends Component{

  //List to hold all the notifications for the flat list
  notifications = [];

  //Get all notifications from the singleton
  constructor(props){
    super(props);

    this.notifications = SingletonClass.getInstance().getNotifications();
  }

  render(){
    return(
      <View>
      <FlatList
        data={this.notifications}
        renderItem={({item})=>
          <Notification
            notification={item.data}
          />}
        keyExtractor={item => item.id}
      />
      </View>
    );
  }
}

export default NotificationsScreen;
