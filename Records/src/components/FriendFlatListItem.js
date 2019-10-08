import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import GLOBALS from './../Globals';

import { connect } from 'react-redux';

//Conditional rendering for the checkmark
const _renderChecmark = (friend, selectedFriends) => {
  if(selectedFriends.includes(friend)){
    return(
      <Image
        source={require('./../assets/checkmark-for-verification.png')}
        style={styles.imageStyle}
      />
    );
  };
};

const FriendFlatListItem = (props) => {
  return(
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{props.friend}</Text>
        {_renderChecmark(props.friend, props.selectedFriends)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle:{
    height: 40,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  imageStyle:{
    height: 25,
    resizeMode:'contain',
    position: 'absolute',
    right: 0
  },
  textStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5,
    fontFamily: GLOBALS.FONT
  }
});

const mapStateToProps = state => {
  return {
    selectedFriends: state.home.selectedFriends
  };
};

export default connect(mapStateToProps)(FriendFlatListItem);
