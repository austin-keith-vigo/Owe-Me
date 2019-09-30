import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

//Tells user to check the screen out
const renderAlertIcon = (tintColor, notifications) => {
  console.log(notifications);
  if(notifications.length > 0) {
    return <Icon name='ios-notifications' size={25} color='red'/>;
  };

  return <Icon name='ios-notifications' size={25} color={tintColor}/>;
};

const Icon = Ionicons;
const NotificationIcon = (props) => {
  return renderAlertIcon(props.tintColor, props.notifications);
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notifications
  };
};

export default connect(mapStateToProps)(NotificationIcon);
