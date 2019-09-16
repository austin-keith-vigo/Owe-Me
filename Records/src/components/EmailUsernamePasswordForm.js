import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import InputField from './InputField';
import GLOBALS from './../Globals';
import CommonButton from './CommonButton';

class EmailUsernamePasswordForm extends Component{

  state={email: "", username: "", password: ""};

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
          placeholder='username'
          onChangeText={text => this.setState({ username: text })}
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
          this.props.onPress(this.state.email, this.state.password, this.state.username)
        }}>
          <View style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
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
});

export default EmailUsernamePasswordForm;
