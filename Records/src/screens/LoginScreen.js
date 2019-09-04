import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import firebase from 'react-native-firebase';

class LoginScreen extends Component{
  
  constructor(props){
    super(props);
    firebase.auth().signInWithEmailAndPassword('austinvigo@gmail.com', '123456')
    .then(()=>{
      console.log('works');
    })
    .catch(function(error) {
      console.log(error.message);
    });
  }
  render(){
    return(
      <View>
        <Text>LoginScreen</Text>
      </View>
    );
  }
}

export default LoginScreen;
