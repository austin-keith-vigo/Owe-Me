import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import SingletonClass from './../SingletonClass';
import MoneyInputField from './../components/MoneyInputField';

class AddRecordScreen extends Component{

  state={ value: ""}

  render(){
    return(
      <View>
        <Text>Enter the total amount of the Bill</Text>
        <MoneyInputField
          onChangeText={text => this.setState({value: text})}
        />
      </View>
    );
  }
}

export default AddRecordScreen;
