import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

const FriendFlatListItem = (props) => {
  return(
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View style={styles.viewStyle}>
        <Text>{props.friend}</Text>
        <Image
          source={require('./../assets/checkmark-for-verification.png')}
          style={styles.imageStyle}
        />
      </View>
    </TouchableOpacity>
  );
}

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
  }
});

export default FriendFlatListItem;
