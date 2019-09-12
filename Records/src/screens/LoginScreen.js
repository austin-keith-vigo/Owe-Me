import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import EmailPasswordForm from './../components/EmailPasswordForm';
import Dialog from "react-native-dialog";
import SingletonClass from './../SingletonClass';
import Record from './../Record';
import {resetAction} from './../../App';

class LoginScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      height: 0,
      backgroundColor: "#237a3b",
      borderBottomWidth: 0
    }
  };

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
        //this.props.navigation.navigate('Home');
        this.props.navigation.dispatch(resetAction);
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

        //Set Notifications
        const notificationsData = snapshot.val()['notifications'];
        for(var key in notificationsData){
          SingletonClass.getInstance().addNotification(key, notificationsData[key]);
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
      <View style={styles.viewStyle}>
        <Text style={styles.title}>RECORDS</Text>
        <EmailPasswordForm
          buttonPressed={this.loginUser.bind(this)}
          buttonTitle="Login"
        />
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.errorMessage}</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.toggleShowAlertState.bind(this)}
          />
        </Dialog.Container>
        {this.renderActivityMonitor()}
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('ForgotPassword');
        }}>
          <Text style={styles.buttonStyle}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('CreateAccount');
        }}>
          <Text style={styles.buttonStyle}>Create Account</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: "bold",
    padding: 40
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "#237a3b",
    alignItems: 'center'
  },
  buttonStyle: {
    paddingTop: 15,
    fontSize: 20
  }
});

export default LoginScreen;
