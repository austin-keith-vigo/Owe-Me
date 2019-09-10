import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import SingletonClass from './../SingletonClass';
import MoneyInputField from './../components/MoneyInputField';
import InputField from './../components/InputField';
import Record from './../Record';

class AddRecordScreen extends Component{

  state={ value: "", title:""}

  //Will Create a new record and pass it to next screen to complete
  createRecord(){
    var newRecord = new Record(this.state.title, {});
    var parameters = {
      totalAmount: this.state.value,
      record: newRecord
    };
    this.props.navigation.navigate("SelectFriends",parameters);
  }

  render(){
    return(
      <View>
        <Text>Enter the title and bill amount</Text>
        <InputField
          placeholder="Title"
          onChangeText={text => this.setState({title: text})}
          secureTextEntry={false}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <MoneyInputField
          onChangeText={text => this.setState({value: text})}
        />
        <Button
          title="Next"
          onPress={this.createRecord.bind(this)}
        />
      </View>
    );
  }
}

export default AddRecordScreen;
