import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import {acceptFriendRequest} from './../FirebaseActions';
import SingletonClass from './../SingletonClass';

//The user accepts the friend request so it updates firebase
const acceptButtonPressed = (notification) => {

  //Add the friend to the SinglenClass
  const senderUsername = notification['data']['senderUsername']
  const senderUID = notification['data']['senderUID'];
  SingletonClass.getInstance().addFriend(senderUsername, 0);
  console.log(SingletonClass.getInstance().getFriends());

  //Update the user's database
  acceptFriendRequest().then(()=>{
    console.log("firebase updated");
  })
}

const declineButtonPressed = () => {
  console.log('decline');
}

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
        onPress={()=>{
          acceptButtonPressed(props.notification);
        }}
      />
      <Button
        title='Decline'
        onPress={declineButtonPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 40,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  textViewStyle:{
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


export default FriendNotification;
