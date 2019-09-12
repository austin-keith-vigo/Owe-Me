import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class HomeFlatListTile extends Component{
  render(){
    return(
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.recordTileStyle}>
          <Text style={styles.recordTextTitleStyle}>
            {this.props.record.getTitle()}
          </Text>
          <Text>${this.props.record.getTotalAmount()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  recordTileStyle:{
    width: 150,
    height: 150,
    backgroundColor: 'gray',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  recordTextTitleStyle: {
    fontSize: 20
  },
  recordTotalStyle: {
    fontSize: 18
  }
})

export default HomeFlatListTile;
