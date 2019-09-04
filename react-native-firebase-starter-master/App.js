import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import EmailPasswordForm from './src/components/EmailPasswordForm';

import firebase from 'react-native-firebase';

class App extends Component{
  render(){
    return(
      <View style={
        {
          flex: 1,
          justifyContent: 'center'
        }
      }>
        <EmailPasswordForm
          loginUser={(email,password)=>{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
              console.log('works')
            })
            .catch((error)=> {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              co
            });
          }}
        />
      </View>
    );
  }
}

export default App;
