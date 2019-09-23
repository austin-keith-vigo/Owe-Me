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

import { connect } from 'react-redux';
import {
  onTitleTextChanged,
  onAmountTextChanged,
  createRecord,
  closeAlertAddRecord
} from './../actions';

import { Alert } from './../components';

class AddRecordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Add Record',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  onTitleTextChange(text) {
    this.props.onTitleTextChanged(text);
  }

  onAmountTextChange(text) {
    this.props.onAmountTextChanged(text);
  }

  onButtonPressed () {
    const { title, amount, navigation, records } = this.props;

    this.props.createRecord(title, amount, navigation, records);
  }

  closeAlert() {
    this.props.closeAlertAddRecord();
  }

  render(){
    return(
      <View style = {styles.viewStyle}>

        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={this.closeAlert.bind(this)}
        />

        <TextMoneyForm
          onChangeTextTitle={(text)=>this.onTitleTextChange(text)}
          onChangeTextValue={(text)=>this.onAmountTextChange(text)}
        />
        
        <CommonButton
          title="Next"
          onPress={this.onButtonPressed.bind(this)}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    records: state.home.records,
    title: state.home.title,
    amount: state.home.amount,
    error: state.home.error,
    errorMessage: state.home.errorMessage
  };
};

const actions = {
  onTitleTextChanged,
  onAmountTextChanged,
  createRecord,
  closeAlertAddRecord
};

export default connect(mapStateToProps, actions)(AddRecordScreen);
