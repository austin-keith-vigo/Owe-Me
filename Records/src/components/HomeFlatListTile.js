import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import GLOBALS from './../Globals';
class HomeFlatListTile extends Component{

  //conditional rendering to determine whether to render an renderImage
  // or text
  renderImage(){
    if(this.props.isImage == true){
      return (
        <View style={styles.recordTileStyle}>
          <Text>Add Record</Text>
        </View>
      );
    }
    else{
      return(
        <View style={styles.recordTileStyle}>
          <Text style={styles.recordTextTitleStyle}>
            {this.props.title}
          </Text>
          <Text>${this.props.amount}</Text>
        </View>
      );
    }
  }
  render(){
    return(
      <TouchableOpacity onPress={this.props.onPress}>
          {this.renderImage()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  recordTileStyle:{
    width: 150,
    height: 150,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

    //Gives a shadow
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  recordTextTitleStyle: {
    fontSize: 20,

  },
  recordTotalStyle: {
    fontSize: 18,
    fontFamily: GLOBALS.FONT
  }
})

export default HomeFlatListTile;
