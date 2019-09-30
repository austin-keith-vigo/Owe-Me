import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import GLOBALS from './../Globals';

import {
  Alert,
  TextMoneyForm,
  Header,
  HeaderButton
} from './../components';

import { connect } from 'react-redux';
import {
  onTitleTextChanged,
  onAmountTextChanged,
  createRecord,
  closeAlertAddRecord,
  onBackButtonPressedAddRecord
} from './../actions';

class AddRecordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
    }
  };

  //Change the stores title state
  onTitleTextChange(text) {
    this.props.onTitleTextChanged(text);
  }

  //Change the stores amount state
  onAmountTextChange(text) {
    this.props.onAmountTextChanged(text);
  }

  //creates a new record for the next screen to finish
  onButtonPressed () {
    const { title, amount, navigation, records } = this.props;

    this.props.createRecord(title, amount, navigation, records);
  }

  //closes the alert
  closeAlert() {
    this.props.closeAlertAddRecord();
  }

  render(){
    return(
      <View style = {styles.viewStyle}>
        <Header
          header='ADD RECORD'
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => {
                this.props.onBackButtonPressedAddRecord(this.props.navigation);
              }}
            />}
          rightButton={
            <HeaderButton
              title='NEXT'
              onPress={this.onButtonPressed.bind(this)}
            />}
        />

        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={this.closeAlert.bind(this)}
        />

        <TextMoneyForm
          onChangeTextTitle={(text)=>this.onTitleTextChange(text)}
          onChangeTextValue={(text)=>this.onAmountTextChange(text)}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
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
  closeAlertAddRecord,
  onBackButtonPressedAddRecord
};

export default connect(mapStateToProps, actions)(AddRecordScreen);
