import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import EmailPasswordForm from './../components/EmailPasswordForm';
import firebase from 'react-native-firebase';
import Dialog from "react-native-dialog";

class CreateAccountScreen extends Component{
  //Handles whether or not to render an activity monitor and alert
  state = {creatingAccount: false, showAlert: false};
  errorMessage="";

  //Will render an Acitivity Monitor while the app is trying to login the user.
  //Otherwise nothing will appear
  renderActivityMonitor(){
    if (this.state.creatingAccount == true){
      return <ActivityIndicator size="large" color="#0000ff" />
    }
  }

  //Will create an account in the firebase database
  createAccount(email, password){
    this.toggleCreateAccountState();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      this.toggleCreateAccountState();
      this.props.navigation.dispatch(resetAction);
    })
    .catch((error)=>{
      this.toggleCreateAccountState();
      this.showAlert(error.message);
    });
  }

  //functions to toggle the states, show alert comes with a parameter
  //becaus the parameter is the new error message
  toggleCreateAccountState(){
    this.setState({creatingAccount: !this.state.creatingAccount});
  }

  //Functions to handle rendering of the alert and the message
  showAlert(message){
    this.errorMessage = message;
    this.setState({showAlert: true});
  }
  handleCloseAlert(){
    this.setState({showAlert: false});
  }

  render(){
    return(
      <View>
        <EmailPasswordForm
          buttonPressed={this.createAccount.bind(this)}
          buttonTitle="Create Account"
        />
        {this.renderActivityMonitor()}
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.errorMessage}</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.handleCloseAlert.bind(this)}
          />
        </Dialog.Container>
      </View>
    );
  }
}

export default CreateAccountScreen;
