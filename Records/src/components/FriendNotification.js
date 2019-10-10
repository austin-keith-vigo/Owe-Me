import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import GLOBALS from './../Globals';

import { acceptFriendNotification } from './../actions';
import { connect } from 'react-redux';

const FriendNotification = (props) => {
  return(
    <View style={styles.mainViewStyle}>

      <View style={styles.imageViewStyle}>
        <Image
          source={require('./../assets/add-friend.png')}
          style={styles.imageStyle}
          resizeMode='contain'
        />
      </View>

      <View style={styles.textViewStyle}>
        <Text style={styles.textStyle}>
          Friend Request:
        </Text>
        <Text style={styles.textUsernameStyle}>
          {props.notification['data']['senderUsername']}
        </Text>
      </View>

      <TouchableOpacity
        onPress={()=>props.acceptFriendNotification(props.notification)}
      >
        <Text style={styles.buttonTextStyle}>accept</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 70,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  textViewStyle:{
    height: 70,
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 15,
    fontFamily: GLOBALS.FONT,
    fontWeight: 'bold'
  },
  textUsernameStyle: {
    fontSize: 20,
    fontFamily: GLOBALS.FONT,
    fontWeight: 'bold'
  },
  buttonTextStyle: {
    fontSize: 18,
    color: GLOBALS.COLORS.BLUE,
    fontFamily: GLOBALS.FONT,
    marginRight: 5
  },
  imageViewStyle: {
    height: 45,
    width: 45,
    marginLeft: 5
  },
  imageStyle: {
    height: undefined,
    width: undefined,
    flex: 1
  }
});


export default connect(null, { acceptFriendNotification })(FriendNotification);
