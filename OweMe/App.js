import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import EmailPasswordForm from './src/components/EmailPasswordForm';

class App extends Component{
  render(){
    return(
      <View style={{flex:1,justifyContent: 'center'}}>
        <EmailPasswordForm
          loginUser={(email, password)=>{
            console.log(email);
            console.log(password);
          }}
        />
      </View>
    );
  }
}


export default App;
