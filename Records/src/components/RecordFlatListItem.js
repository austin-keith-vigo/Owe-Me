import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import GLOBALS from './../Globals';

class RecordFlatListItem extends Component{

  render(){
    return(
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>
          {this.props.title}
        </Text>
        <Text style={styles.amountStyle}>
          ${this.props.amount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    height: 60,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    position:'absolute',
    left: 15,
    fontFamily: GLOBALS.FONT
  },
  amountStyle: {
    position:'absolute',
    right: 15,
    fontSize: 18,
    fontFamily: GLOBALS.FONT
  }
})

export default RecordFlatListItem;
