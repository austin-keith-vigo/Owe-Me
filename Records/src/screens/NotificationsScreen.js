import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import SingletonClass from './../SingletonClass';

class NotificationsScreen extends Component{

  notifications = [];

  constructor(props){
    super(props);

    this.notifications = SingletonClass.getInstance().getNotifications();
  }

  render(){
    return(
      <View>
      <FlatList
        data={this.notifications}
        renderItem={({item})=> <Text>{item.id}</Text>}
        keyExtractor={item => item.id}
      />
      </View>
    );
  }
}

export default NotificationsScreen;
