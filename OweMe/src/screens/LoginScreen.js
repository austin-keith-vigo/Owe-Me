import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import EmailPasswordForm from './../components/EmailPasswordForm';

class LoginScreen extends Component{

  loginUser(email, password){
    console.log(email);
    console.log(password);
  }
  render(){
    return(
      <View style = {styles.viewStyle}>
        <EmailPasswordForm
          loginUser={this.loginUser.bind(this)}
        />
        <TouchableOpacity
          onPress={()=>{
            console.log('register user');
          }}
        >
          <Text>Register Now</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue'
  }
});

export default LoginScreen;
