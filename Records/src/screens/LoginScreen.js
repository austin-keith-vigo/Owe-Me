import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import EmailPasswordForm from './../components/EmailPasswordForm';
import Dialog from "react-native-dialog";
import SingletonClass from './../SingletonClass';

class LoginScreen extends Component{

  //Handles whether or not to render an activity monitor and alert
  state = {loggingIn: false, showAlert: false};

  //Logs in the user using firebase's authentication.
  //Also, handles turning off and on the activity monitor
  loginUser(email,password){
    this.toggleLoggingInState();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.toggleLoggingInState();
      SingletonClass.getInstance().setUserUID(firebase.auth().currentUser.uid);
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
          buttonPressed={this.loginUser.bind(this)}
          buttonTitle="Login"
        />
        {this.renderActivityMonitor()}
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>Invalid Login Credentials</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.toggleShowAlertState.bind(this)}
          />
        </Dialog.Container>
        <Button
          title="Create Account"
          onPress={()=>{
            this.props.navigation.navigate('CreateAccount');
          }}
        />
        <Button
          title="Forgot Password"
          onPress={()=>{
            this.props.navigation.navigate('ForgotPassword');
          }}
        />
      </View>
    );
  }
}

export default LoginScreen;
