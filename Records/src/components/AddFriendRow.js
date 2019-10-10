import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import {
  sendRequestToUser
} from './../actions';

import GLOBALS from './../Globals';

const sendFriendRequest = (sendRequestToUser, usersRequested, username) => {
  sendRequestToUser(usersRequested, username);
};

const renderButton = (username, usersRequested, sendRequestToUser) => {
  //Renders a checkmark if a request has been sent
  if (usersRequested.includes(username)) {
    return (
      <View style={{height: 40, width: 40, marginRight: 5}}>
        <Image
          source={require('./../assets/checkmark-for-verification.png')}
          resizeMode='contain'
          style={{height: undefined, width: undefined, flex: 1}}
        />
      </View>
    );
  };

  //Renders button to send request
  return(
    <TouchableOpacity
      onPress={() => sendFriendRequest(sendRequestToUser, usersRequested, username)}
    >
      <Text style={styles.textStyle}>send</Text>
    </TouchableOpacity>
  );
}

const AddFriendRow = (props) => {
  return(
    <View style={styles.listRowViewStyle}>

      <Text style={styles.listTextStyle}>{props.username}</Text>

      <View style={{flex: 1}}/>

      {renderButton(props.username, props.usersRequested, props.sendRequestToUser)}

    </View>
  );
};

const styles = {
  listRowViewStyle: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listTextStyle: {
    fontSize: 18,
    fontFamily: GLOBALS.FONT,
    fontWeight: 'bold',
    marginLeft: 5
  },
  textStyle: {
    color: GLOBALS.COLORS.BLUE,
    marginRight: 5,
    fontSize: 18,
    fontFamily: GLOBALS.FONT
  }
}

const mapStateToProps = state => {
  return {
    usersRequested: state.friends.usersRequested
  };
};

export default connect(mapStateToProps, { sendRequestToUser })(AddFriendRow);
