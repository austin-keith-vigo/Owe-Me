import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import GLOBALS from './../Globals';

import { Alert, EmailPasswordForm, Spinner } from './../components';

import { connect } from 'react-redux';
import { loginUser, closeErrorMessage } from './../actions';

class LoginScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      height: 0,
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //Users an action to handle user login
  loginButtonPressed(){
    const { email, password, navigation } = this.props;

    this.props.loginUser(email, password, navigation);
  }

  //closes the dialog component
  closeAlert() {
    this.props.closeErrorMessage();
  }

  renderSpinner() {
    if(this.props.loading) {
      return <Spinner/>;
    }
  }
  
  render(){
    return(
      <View style={styles.viewStyle}>

        <Text style={styles.title}>RECORDS</Text>

        <EmailPasswordForm
          buttonTitle="Login"
          loginButtonPressed={this.loginButtonPressed.bind(this)}
        />

        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={this.closeAlert.bind(this)}
        />

        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('ForgotPassword');
        }}>
          <Text style={styles.buttonStyle}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('CreateAccount');
        }}>
          <Text style={styles.buttonStyle}>Create Account</Text>
        </TouchableOpacity>

        {this.renderSpinner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: "bold",
    padding: 40
  },
  viewStyle: {
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  },
  buttonStyle: {
    paddingTop: 15,
    fontSize: 20
  }
});

const mapStateToProps = state => {
  return {
    email: state.login.email,
    password: state.login.password,
    error: state.login.error,
    errorMessage: state.login.errorMessage,
    loading: state.login.loading
  };
};

const actions = {
  loginUser,
  closeErrorMessage
};

export default connect(mapStateToProps, actions)(LoginScreen);
