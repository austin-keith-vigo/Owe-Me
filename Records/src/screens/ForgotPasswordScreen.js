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

  render(){
    return(
      <View style={styles.viewStyle}>
        <View style={styles.bufferView}></View>
        <InputField
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={this.sendPasswordResetEmail.bind(this)}>
          <View style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>Send Email</Text>
          </View>

        </TouchableOpacity>
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

export default ForgotPasswordScreen;
