import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import InputField from './../components/InputField';
import firebase from 'react-native-firebase';
import Dialog from "react-native-dialog";

class ForgotPasswordScreen extends Component{

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

  render(){
    return(
      <View>
        <InputField
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <Button
          title='Send Email'
          onPress={this.sendPasswordResetEmail.bind(this)}
        />
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

export default ForgotPasswordScreen;
