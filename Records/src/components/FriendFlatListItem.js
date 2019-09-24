import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { connect } from 'react-redux';

class FriendFlatListItem extends Component {

  //Conditional rendering for the checkmard
  renderChecmark(){
    if(this.props.selectedFriends.includes(this.props.friend)){
      return(
        <Image
          source={require('./../assets/checkmark-for-verification.png')}
          style={styles.imageStyle}
        />
      );
    };
  }

  render(){
    return(
      <TouchableOpacity
        onPress={this.props.onPress}
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

const mapStateToProps = state => {
  return {
    selectedFriends: state.home.selectedFriends
  };
};

export default connect(mapStateToProps)(FriendFlatListItem);
