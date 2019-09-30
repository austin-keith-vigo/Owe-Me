import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { dismissPaidNotification } from './../actions';
import { connect } from 'react-redux';

const PaidNotification = ({notification, notifications, dismissPaidNotification}) => {
  return(
    <View style={styles.mainViewStyle}>
      <View style={styles.textViewStyle}>
        <Text style={styles.titleTextStyle}>
          {notification['data']['title']}
        </Text>
        <Text style={styles.senderTextStyle}>
          {notification['data']['senderUsername']} : paid
        </Text>
      </View>
      <Button
        title="Dismiss"
        onPress={()=> dismissPaidNotification(notification, notifications)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 60,
    width: "100%",
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  textViewStyle: {
    height: 60,
    flex: 1
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  senderTextStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default connect(null, { dismissPaidNotification })(PaidNotification);
