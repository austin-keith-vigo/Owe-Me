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
import GLOBALS from './../Globals';
import TextMoneyForm from './../components/TextMoneyForm';
import Dialog from "react-native-dialog";

class AddRecordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Add Record',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  state={ value: "", title:"", showAlert: false};
  errorMessage="Please fill out all fields";

  //Will Create a new record and pass it to next screen to complete
  createRecord(){
    if (this.state.value == 0 || this.state.title == ""){
      this.toggleShowAlertState();
    }
    else{
      var newRecord = new Record(this.state.title, {});
      var parameters = {
        totalAmount: this.state.value,
        record: newRecord
      };
      this.props.navigation.navigate("SelectFriends",parameters);
    }
  }

  //Controls whether to show alert
  toggleShowAlertState(){
    this.setState({showAlert: !this.state.showAlert});
  }

  render(){
    return(
      <View>
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.errorMessage}</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.toggleShowAlertState.bind(this)}
          />
        </Dialog.Container>
        <Text>Enter the title and bill amount</Text>
        <TextMoneyForm
          onChangeTextTitle={(text)=>this.setState({title: text})}
          onChangeTextValue={(text)=>this.setState({value: text})}
        />
        <Button
          title="Next"
          onPress={this.createRecord.bind(this)}
        />
      </View>
    );
  }
}

// <InputField
//   placeholder="Title"
//   onChangeText={text => this.setState({title: text})}
//   secureTextEntry={false}
//   autoCapitalize="none"
//   autoCorrect={false}
// />
// <MoneyInputField
//   onChangeText={text => this.setState({value: text})}
// />

export default AddRecordScreen;
