import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import InputField from './InputField';
import { connect } from 'react-redux';
import GLOBALS from './../Globals';

//Actions
import {
  emailChanged,
  passwordChanged,
  loginUser
} from './../actions';

class EmailPasswordForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  };

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  };

  render(){
    return(
      <View style={styles.viewStyle}>
        <InputField
          placeholder='email'
          onChangeText={text => this.onEmailChange(text)}
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.email}
        />
        <InputField
          placeholder='password'
          onChangeText={text => this.onPasswordChange(text)}
          secureTextEntry={true}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.password}
        />
        <TouchableOpacity onPress={this.props.loginButtonPressed}>
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
    fontSize: 20,
    fontFamily: GLOBALS.FONT
  }
})

const mapStateToProps = state => {
  return {
    email: state.login.email,
    password: state.login.password
  };
};

const actions = {
  emailChanged,
  passwordChanged,
  loginUser
};

export default connect(mapStateToProps, actions)(EmailPasswordForm);
