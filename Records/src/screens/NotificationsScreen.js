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
import GLOBALS from './../Globals';

class NotificationsScreen extends Component{

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
          />
        );
    }
  }

  //Controls what each list item looks like
  _renderListItem = ({item}) => (
    <View>
      {this.renderNotificationType(item['notification'])}
    </View>
  );

  render(){
    return(
      <View>
        <FlatList
          data={this.flatListData}
          renderItem={this._renderListItem}
        />
      </View>
    );
  }
}

export default NotificationsScreen;
