import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import GLOBALS from './../Globals';
import CommonButton from './../components/CommonButton';
import SingletonClass from './../SingletonClass';
import {sendNotification} from './../FirebaseActions';

class SendFriendRequestScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Send Request',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //Sends a friend request to the user
  sendButtonPressed(){
    const notification = {
      type: "friendRequest",
      senderUsername: SingletonClass.getInstance().getUsername(),
      senderUID: SingletonClass.getInstance().getUserUID()
    };

    //Send the notification
    sendNotification(this.props.navigation.getParam("uid"),notification).then(()=>{
      this.props.navigation.navigate("Home");
    });
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <Text style={styles.headerStyle}>Send friend request to:</Text>
        <Text style={styles.usernameTextStyle}>
          {this.props.navigation.getParam("username")}
        </Text>
        <CommonButton
          title="Send"
          onPress={this.sendButtonPressed.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  usernameTextStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  viewStyle: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  }
});
export default SendFriendRequestScreen;
