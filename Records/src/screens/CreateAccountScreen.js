import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import EmailPasswordForm from './../components/EmailPasswordForm';
import firebase from 'react-native-firebase';

class CreateAccountScreen extends Component{

  //Will create an account in the firebase database
  createAccount(email, password){
    console.log(email);
    console.log(password);
  }

  render(){
    return(
      <View>
        <EmailPasswordForm
          buttonPressed={this.createAccount.bind(this)}
          buttonTitle="Create Account"
        />
      </View>
    );
  }
}

export default CreateAccountScreen;
