import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

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
    height: 40,
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
  },
  amountStyle: {
    position:'absolute',
    right: 15,
    fontSize: 18
  }
})

export default RecordFlatListItem;
