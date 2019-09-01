import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import firebase from 'react-native-firebase';

class SplashScreen extends Component{

  //Initialize the firebase app
  constructor(props){
    super(props);
    firebase.initializeApp({
      apiKey: "AIzaSyCHlPh9cpw4kKUiTbenYZ7YCnYEHcJNj28",
      authDomain: "owe-me-a31d8.firebaseapp.com",
      databaseURL: "https://owe-me-a31d8.firebaseio.com",
      projectId: "owe-me-a31d8",
      storageBucket: "",
      messagingSenderId: "64030765341",
      appId: "1:64030765341:web:6af9b0e0a2c9c4b3"
    });
    this.props.navigation.navigate('Login');
  }

  
  render(){
    return(
      <View>
        <Text>Splash</Text>
      </View>
    );
  }
}

export default SplashScreen;
