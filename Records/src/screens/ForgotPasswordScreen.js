import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import InputField from './../components/InputField';
import firebase from 'react-native-firebase';
import Dialog from "react-native-dialog";
import GLOBALS from './../Globals';

import { connect } from 'react-redux';
import {
  emailChangedForgotPassword,
  sendForgotPasswordEmail,
  closeAlertForgotPassword
} from './../actions';

import { Alert } from './../components';

class ForgotPasswordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Forgot Password',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //keeps track of what is in the input field, and the alert attributes
  state={email: '', showAlert: false}
  errorMessage="";

  //Sends an email to the user's email to reset their password
  sendPasswordResetEmail(){
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(()=>{
      this.props.navigation.navigate('CheckEmail');
    }).catch((error)=>{
      this.toggleShowAlertState();
      this.showAlert(error.message);
    });
  }

  //Functions to handle rendering of the alert and the message
  showAlert(message){
    this.errorMessage = message;
    this.setState({showAlert: true});
  }
  handleCloseAlert(){
    this.setState({showAlert: false});
  }

  //Toggles the state of showAlert so I don't have to keep calling setState();
  toggleShowAlertState(){
    this.setState({showAlert: !this.state.showAlert});
  }

  //Updates the email state
  onEmailChanged(text) {
    this.props.emailChangedForgotPassword(text);
  }

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
        {console.log(this.props)}
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
