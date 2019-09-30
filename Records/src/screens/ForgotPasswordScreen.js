import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import GLOBALS from './../Globals';

import { connect } from 'react-redux';
import {
  emailChangedForgotPassword,
  sendForgotPasswordEmail,
  closeAlertForgotPassword
} from './../actions';

import { Alert, InputField, Header, HeaderButton } from './../components';

class ForgotPasswordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
    }
  };


  //Updates the email state
  onEmailChanged(text) {
    this.props.emailChangedForgotPassword(text);
  }

  //Sends the email to the user
  onSendEmailButtonPressed() {
    const { email, navigation} = this.props;

    this.props.sendForgotPasswordEmail(email, navigation);
  }

  //closes the dialog component
  closeAlert() {
    this.props.closeAlertForgotPassword();
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <Header
          header="FORGOT PASSWORD"
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => {
                this.props.navigation.pop();
              }}
            />}
        />

        <View style={styles.bufferView}></View>

        <InputField
          placeholder='email'
          onChangeText={text => this.onEmailChanged(text)}
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.email}
        />

        <TouchableOpacity onPress={this.onSendEmailButtonPressed.bind(this)}>
          <View style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>Send Email</Text>
          </View>

        </TouchableOpacity>

        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={this.closeAlert.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    alignItems: 'center',
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN
  },
  buttonViewStyle: {
    height: 40,
    width: 120,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonTextStyle:{
    fontSize: 20
  },
  bufferView: {
    height: 80,
    backgroundColor: GLOBALS.COLORS.GREEN
  }
});

const mapStateToProps = state => {
  return {
    email: state.forgotPassword.email,
    error: state.forgotPassword.error,
    errorMessage: state.forgotPassword.errorMessage
  };
}

const actions = {
  emailChangedForgotPassword,
  sendForgotPasswordEmail,
  closeAlertForgotPassword
};

export default connect(mapStateToProps, actions)(ForgotPasswordScreen);
