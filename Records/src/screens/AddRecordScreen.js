import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import SingletonClass from './../SingletonClass';
import MoneyInputField from './../components/MoneyInputField';

class AddRecordScreen extends Component{

  state={ value: ""} 

  render(){
    return(
      <View>
        <MoneyInputField
          onChangeText={text => this.setState({value: text})}
        />
      </View>
    );
  }
}

export default AddRecordScreen;
