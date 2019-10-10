import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import GLOBALS from './../Globals';

import { connect } from 'react-redux';
import { payRecordNotification } from './../actions';

const RecordNotification = (props) => {
  return(
    <View style={styles.mainViewStyle}>

      <View style={styles.imageViewStyle}>
        <Image
          source={require('./../assets/dollar-symbol.png')}
          style={styles.imageStyle}
          resizeMode='contain'
        />
      </View>

      <View style = {styles.textViewStyle}>
        <Text style = {styles.titleTextStyle}>
          {props.notification['data']['title']}
        </Text>
        <Text style = {styles.senderTextStyle}>
          {props.notification['data']['senderUsername']} : ${props.notification['data']['amount']}
        </Text>
      </View>

      <TouchableOpacity
        onPress={()=>props.payRecordNotification(props.notification)}
      >
        <Text style={styles.buttonTextStyle}>paid</Text>
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
  textViewStyle: {
    height: 70,
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  titleTextStyle: {
    fontSize: 20,
    fontFamily: GLOBALS.FONT,
    fontWeight: 'bold'
  },
  senderTextStyle: {
    fontSize: 18,
    fontFamily: GLOBALS.FONT,
    fontWeight: 'bold'
  },
  buttonTextStyle: {
    fontSize: 18,
    fontFamily: GLOBALS.FONT,
    color: GLOBALS.COLORS.BLUE,
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

export default connect(null, { payRecordNotification })(RecordNotification);
