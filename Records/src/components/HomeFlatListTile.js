import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class HomeFlatListTile extends Component{

  //conditional rendering to determine whether to render an renderImage
  // or text
  renderImage(){
    if(this.props.isImage == true){
      return (
        <View style={styles.recordTileStyle}>
          <Text>Image</Text>
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
