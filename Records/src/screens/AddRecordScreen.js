import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import SingletonClass from './../SingletonClass';
import MoneyInputField from './../components/MoneyInputField';
import InputField from './../components/InputField';
import Record from './../Record';
import GLOBALS from './../Globals';
import TextMoneyForm from './../components/TextMoneyForm';
import Dialog from "react-native-dialog";
import CommonButton from './../components/CommonButton';

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
  errorMessage="";

  //Will Create a new record and pass it to next screen to complete
  createRecord(){
    if (this.state.value == 0 || this.state.title == ""){
      this.errorMessage = "Please fill out all fields";
      this.toggleShowAlertState();
    }
    else{
      var amount = Number(this.state.value);

      if (Number.isNaN(amount)){
        this.toggleShowAlertState();
        this.errorMessage = "Invalid money input value. Do not use commas";
      }
      else{
        var newRecord = new Record(this.state.title, {});
        var parameters = {
          totalAmount: amount,
          record: newRecord
        };
        this.props.navigation.navigate("SelectFriends",parameters);
      }
    }
  }

  //Controls whether to show alert
  toggleShowAlertState(){
    this.setState({showAlert: !this.state.showAlert});
  }

  render(){
    return(
      <View style = {styles.viewStyle}>
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.errorMessage}</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.toggleShowAlertState.bind(this)}
          />
        </Dialog.Container>
        <TextMoneyForm
          onChangeTextTitle={(text)=>this.setState({title: text})}
          onChangeTextValue={(text)=>this.setState({value: text})}
        />
        <CommonButton
          title="Next"
          onPress={()=>{this.createRecord()}}
        />
      </View>
    );
  }
}

// <Button
//   title="Next"
//   onPress={this.createRecord.bind(this)}
// />

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default AddRecordScreen;
