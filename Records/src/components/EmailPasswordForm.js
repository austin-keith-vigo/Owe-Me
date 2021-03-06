import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
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
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <InputField
          placeholder='password'
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={()=>{
          this.props.buttonPressed(this.state.email, this.state.password)
        }}>
          <View style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonViewStyle: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonTextStyle:{
    fontSize: 20
  }
})

export default EmailPasswordForm;
