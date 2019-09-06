import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import EmailPasswordForm from './../components/EmailPasswordForm';
import Dialog from "react-native-dialog";

class LoginScreen extends Component{

  //Handles whether or not to render an activity monitor and alert
  state = {loggingIn: false, showAlert: false};

  //Logs in the user using firebase's authentication.
  //Also, handles turning off and on the activity monitor
  loginUser(email,password){
    this.toggleLoggingInState();
    firebase.auth().signInWithEmailAndPassword('austinvigo@gmail.com', '123456')
    .then(()=>{
      this.toggleLoggingInState();
      this.props.navigation.navigate('Home');
    })
    .catch((error)=>{
      this.setState({loggingIn: false, showAlert: true})
    });
  }

  //Will render an Acitivity Monitor while the app is trying to login the user.
  //Otherwise nothing will appear
  renderActivityMonitor(){
    if (this.state.loggingIn == true){
      return <ActivityIndicator size="large" color="#0000ff" />
    }
  }

  //Toggles the state of logginIn so I don't have to keep calling setState();
  toggleLoggingInState(){
    this.setState({loggingIn: !this.state.loggingIn});
  }

  //Toggles the state of showAlert so I don't have to keep calling setState();
  toggleShowAlertState(){
    this.setState({showAlert: !this.state.showAlert});
  }

  render(){
    return(
      <View>
        <EmailPasswordForm
          loginUser={this.loginUser.bind(this)}
        />
        {this.renderActivityMonitor()}
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>Invalid Login Credentials</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.toggleShowAlertState.bind(this)}
          />
        </Dialog.Container>
      </View>
    );
  }
}

export default LoginScreen;
