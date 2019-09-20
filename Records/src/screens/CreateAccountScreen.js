import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import EmailPasswordForm from './../components/EmailPasswordForm';
import EmailUsernamePasswordForm from './../components/EmailUsernamePasswordForm';
import firebase from 'react-native-firebase';
import Dialog from "react-native-dialog";
import GLOBALS from './../Globals';
import SingletonClass from './../SingletonClass';
import { createAccount } from './../FirebaseActions';

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

  render(){
    return(
      <View style={styles.viewStyle}>
        <EmailUsernamePasswordForm
          onPress={this.createAccountButtonPressed.bind(this)}
          buttonTitle="Finish"
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

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  }
});

export default CreateAccountScreen;
