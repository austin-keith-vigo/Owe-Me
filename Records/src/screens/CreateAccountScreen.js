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
  createAccount(email, password, username){
    this.toggleCreateAccountState();

    //Check that the username is available
    firebase.database().ref('usernames').once('value').then((snapshot)=>{
      var index = 0;
      const usernames = Object.keys(snapshot.val());
      while(index < usernames.length && usernames[index] != username.toString()){
        ++index;
      }

      //The username was found
      if (index < usernames.length){
        this.toggleCreateAccountState();
        this.showAlert("Username already exists");
      } else {

        //Create an account for the user
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{

          //Default the user's database data
          const userData ={
            username: {username},
            friends: "",
            notifications: "",
            records: ""
          };
          const uid = firebase.auth().currentUser.uid;
          firebase.database().ref(uid).set(userData);
          firebase.database().ref('usernames/' + username).set(uid);

          //Set Singleton Data
          SingletonClass.getInstance().setUserUID(uid);
          SingletonClass.getInstance().setUsername(username);

          this.toggleCreateAccountState();
          this.props.navigation.navigate('App');
        })
        .catch((error)=>{
          this.toggleCreateAccountState();
          this.showAlert(error.message);
        });
      }
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
          onPress={this.createAccount.bind(this)}
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
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  }
});

export default CreateAccountScreen;
