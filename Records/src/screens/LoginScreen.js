import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import EmailPasswordForm from './../components/EmailPasswordForm';

class LoginScreen extends Component{

  //Handles whether or not to render an activity monitor
  state = {loggingIn: false};

  //Logs in the user using firebase's authentication.
  //Also, handles turning off and on the activity monitor
  loginUser(email,password){
    this.setState({loggingIn: true});
    firebase.auth().signInWithEmailAndPassword('austinvigo@gmail.com', '123456')
    .then(()=>{
      this.setState({loggingIn: false});
      this.props.navigation.navigate('Home');
    })
    .catch(function(error) {
      this.setState({loggingIn: false});
      console.log(error.message);
    });
  }

  //Will render an Acitivity Monitor while the app is trying to login the user.
  //Otherwise nothing will appear
  renderActivityMonitor(){
    if (this.state.loggingIn == true){
      return <ActivityIndicator size="large" color="#0000ff" />
    }
  }

  render(){
    return(
      <View>
        <EmailPasswordForm
          loginUser={this.loginUser.bind(this)}
        />
        {this.renderActivityMonitor()}
      </View>
    );
  }
}

export default LoginScreen;
