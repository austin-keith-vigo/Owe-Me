import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import InputField from './InputField';

class EmailPasswordForm extends Component {

  state = { email: '', password: '' };

  render(){
    return(
      <View style={styles.viewStyle}>
        <InputField
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          autoCorrect={false}
          autoCapitalize={false}
          secureTextEntry={false}
        />
        <InputField
          placeholder='password'
          onChangeText={text => this.setState({ password: text })}
          autoCorrect={false}
          autoCapitalize={false}
          secureTextEntry={true}
        />
        <Button
          title='Login'
          onPress={()=>{this.props.loginUser(this.state.email, this.state.password)}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    justifyContent: 'center'
  }
})

export default EmailPasswordForm;
