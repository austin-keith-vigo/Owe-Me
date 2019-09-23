import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase';
import Dialog from "react-native-dialog";
import GLOBALS from './../Globals';
import SingletonClass from './../SingletonClass';
import { createAccount } from './../FirebaseActions';

import { connect } from 'react-redux';
import {
  onCreateAccountButtonPressed,
  createAccountCloseAlert
} from './../actions';

import { Alert, EmailUsernamePasswordForm } from './../components';

class CreateAccountScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Create Account',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

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
  createAccountButtonPressed(email, password, username){
    this.toggleCreateAccountState();

    //Create the account with firebase
    createAccount(email, password, username).then(()=>{
      //Get the user's uid
      const uid = firebase.auth().currentUser.uid;

      //Set Singleton Data
      SingletonClass.getInstance().setUserUID(uid);
      SingletonClass.getInstance().setUsername(username);

      this.toggleCreateAccountState();
      this.props.navigation.navigate('App');
    })
    .catch((error) => {
      this.toggleCreateAccountState();
      this.showAlert(error);
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

  onCreateAccountButtonPressed(){
    const { email, password, username, navigation } = this.props;
    this.props.onCreateAccountButtonPressed(email, username, password, navigation);
  }

  closeAlert() {
    this.props.createAccountCloseAlert();
  }

  render(){
    return(
      <View style={styles.viewStyle}>

        <EmailUsernamePasswordForm
          onPress={this.onCreateAccountButtonPressed.bind(this)}
          buttonTitle="Finish"
        />
        {this.renderActivityMonitor()}
        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={() => this.closeAlert()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    email: state.createAccount.email,
    username: state.createAccount.username,
    password: state.createAccount.password,
    error: state.createAccount.error,
    errorMessage: state.createAccount.errorMessage
  };
};

const actions = {
  onCreateAccountButtonPressed,
  createAccountCloseAlert
};

export default connect(mapStateToProps, actions)(CreateAccountScreen);
