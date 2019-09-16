import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

class FriendFlatListItem extends Component {

  state={selected:false}

  //Conditional rendering for the checkmard
  renderChecmark(){
    if(this.state.selected == true){
      return(
        <Image
          source={require('./../assets/checkmark-for-verification.png')}
          style={styles.imageStyle}
        />
      );
    }
  }

  toggleSelectedState(){
    this.setState({selected:!this.state.selected});
  }

  render(){
    return(
      <TouchableOpacity
        onPress={()=>{
          this.toggleSelectedState();
          this.props.onPress();
        }}
      >
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>{this.props.friend}</Text>
          {this.renderChecmark()}
        </View>
      </TouchableOpacity>
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
  imageStyle:{
    height: 25,
    resizeMode:'contain',
    position: 'absolute',
    right: 0
  },
  textStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5
  }
});

export default FriendFlatListItem;
