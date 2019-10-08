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

import { connect } from 'react-redux';
import {
  onEmailChangedCreateAccount,
  onUsernameChangedCreateAccount,
  onPasswordChangedCreateAccount
} from './../actions';

class EmailUsernamePasswordForm extends Component{

  onEmailChanged(text) {
    this.props.onEmailChangedCreateAccount(text);
  }

  onUsernameChanged(text) {
    this.props.onUsernameChangedCreateAccount(text);
  }

  onPasswordChanged(text) {
    this.props.onPasswordChangedCreateAccount(text);
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <InputField
          placeholder='email'
          onChangeText={text => this.onEmailChanged(text)}
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.email}
        />
        <InputField
          placeholder='username'
          onChangeText={text => this.onUsernameChanged(text)}
          secureTextEntry={false}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.username}
        />
        <InputField
          placeholder='password'
          onChangeText={text => this.onPasswordChanged(text)}
          secureTextEntry={true}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.password}
        />
        <TouchableOpacity onPress={this.props.onPress}>
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
    fontSize: 20,
    fontFamily: GLOBALS.FONT
  }
});

const mapStateToProps = state => {
  return {
    email: state.createAccount.email,
    username: state.createAccount.username,
    password: state.createAccount.password
  };
};

const actions = {
  onEmailChangedCreateAccount,
  onUsernameChangedCreateAccount,
  onPasswordChangedCreateAccount
};

export default connect(mapStateToProps, actions)(EmailUsernamePasswordForm);
