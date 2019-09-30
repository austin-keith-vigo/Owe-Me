import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import GLOBALS from './../Globals';

import { Alert, EmailUsernamePasswordForm } from './../components';

import { connect } from 'react-redux';
import {
  onCreateAccountButtonPressed,
  createAccountCloseAlert
} from './../actions';

class CreateAccountScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  onCreateAccountButtonPressed(){
    const { email, password, username, navigation } = this.props;

    this.props.onCreateAccountButtonPressed(email, username, password, navigation);
  }

  closeAlert() {
    this.props.createAccountCloseAlert();
  }

  render(){
    return(
      <View style={styles.viewStyle}>

        <EmailUsernamePasswordForm
          onPress={this.onCreateAccountButtonPressed.bind(this)}
          buttonTitle="Finish"
        />

        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={() => this.closeAlert()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    email: state.createAccount.email,
    username: state.createAccount.username,
    password: state.createAccount.password,
    error: state.createAccount.error,
    errorMessage: state.createAccount.errorMessage
  };
};

const actions = {
  onCreateAccountButtonPressed,
  createAccountCloseAlert
};

export default connect(mapStateToProps, actions)(CreateAccountScreen);
