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
import Record from './../Record';

class LoginScreen extends Component{

  //Handles whether or not to render an activity monitor and alert
  state = {loggingIn: false, showAlert: false};
  errorMessage = "";

  //Logs in the user using firebase's authentication.
  //Also, handles turning off and on the activity monitor
  loginUser(email,password){
    this.toggleLoggingInState();
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      this.toggleLoggingInState();
      this.willInitializeSingleton().then(()=>{
        this.props.navigation.navigate('Home');
      })
      .catch((message)=>{
        this.errorMessage = message;
        this.setState({loggingIn: false, showAlert: true})
      });
    })
    .catch((error)=>{
      this.errorMessage = error.message;
      this.setState({loggingIn: false, showAlert: true})
    });
  }

  //A promise that the Singleon will be initialized.
  //Is a promise to make sure the app does not move on to anymore pages until
  //Singleton is initialized.
  willInitializeSingleton(){
    return new Promise(function(resolve, reject) {
      SingletonClass.getInstance().setUserUID(firebase.auth().currentUser.uid);
      var filepath = SingletonClass.getInstance().getUserUID();
      var databaseRef = firebase.database().ref(filepath);

      databaseRef.once('value').then((snapshot)=>{

        //Set singleton username and UID
        SingletonClass.getInstance().setUsername(snapshot.val()['username']);

        //Set SingletonRecords
        const recordsData = snapshot.val()['records'];
        for (var key in recordsData){
          var newRecord = new Record(key, recordsData[key]);
          SingletonClass.getInstance().addRecord(newRecord);
        }

        //Set Singleton friends
        const friendsData = snapshot.val()['friends'];
        for (var key in friendsData){
          SingletonClass.getInstance().addFriend(key, friendsData[key]);
        }

        resolve('Completed');
      })
      .catch((error)=>{
        reject(error.messsage);
      });
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
          <Dialog.Title>{this.errorMessage}</Dialog.Title>
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
