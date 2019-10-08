import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import GLOBALS from './../Globals';

import {
  FriendNotification,
  RecordNotification,
  PaidNotification,
  Header,
  HeaderButton
} from './../components';

import { connect } from 'react-redux';

class NotificationsScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
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
        <Header
          header="Notifications"
        />
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
