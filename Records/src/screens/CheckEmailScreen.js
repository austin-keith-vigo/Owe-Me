import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

class CheckEmailScreen extends Component{
  render(){
    return(
      <View>
        <Text>Check your email to reset your password</Text>
        <Button
          title="Go Back To Login"
          onPress={()=>{
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}

export default CheckEmailScreen;
