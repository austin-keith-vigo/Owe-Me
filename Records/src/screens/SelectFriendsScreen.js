import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

class SelectFriendsScreen extends Component{
  constructor(props){
    super(props);
    console.log(this.props.navigation.getParam('totalAmount'));
  }
  
  render(){
    return(
      <View>
        <Text>SelectFriendsScreen</Text>
      </View>
    );
  }
}

export default SelectFriendsScreen;
