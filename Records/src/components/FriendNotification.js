import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import { acceptFriendNotification } from './../actions';
import { connect } from 'react-redux';

const FriendNotification = (props) => {
  return(
    <View style={styles.mainViewStyle}>
      <View style={styles.textViewStyle}>
        <Text style={styles.textStyle}>
          Friend Request:
        </Text>
        <Text style={styles.textUsernameStyle}>
          {props.notification['data']['senderUsername']}
        </Text>
      </View>
      <Button
        title='Accept'
        onPress={()=>props.acceptFriendNotification(props.notification)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 60,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  textViewStyle:{
    height: 60,
    flex: 1,
    paddingLeft: 5
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textUsernameStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});


export default connect(null, { acceptFriendNotification })(FriendNotification);
