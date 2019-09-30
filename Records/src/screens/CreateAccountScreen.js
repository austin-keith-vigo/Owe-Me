import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import GLOBALS from './../Globals';

import {
  Alert,
  EmailUsernamePasswordForm,
  Header,
  HeaderButton,
  Spinner
} from './../components';

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
      borderBottomWidth: 0,
      height: 0
    }
  };

  onCreateAccountButtonPressed(){
    const { email, password, username, navigation } = this.props;

    this.props.onCreateAccountButtonPressed(email, username, password, navigation);
  }

  closeAlert() {
    this.props.createAccountCloseAlert();
  }

  renderSpinner() {
    if(this.props.loading) {
      return <Spinner/>;
    }
  }

  render(){
    return(
      <View style={styles.mainViewStyle}>
        <Header
          header="CREATE ACCOUNT"
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => {
                this.props.navigation.pop();
              }}
            />}
        />
        <View style={styles.viewStyle}>
          <EmailUsernamePasswordForm
            onPress={this.onCreateAccountButtonPressed.bind(this)}
            buttonTitle="Finish"
          />
        </View>


        <Alert
          isVisible={this.props.error}
          errorMessage={this.props.errorMessage}
          closeAlert={() => this.closeAlert()}
        />

        {this.renderSpinner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: GLOBALS.COLORS.GREEN,
    flex: 1
  },
  viewStyle: {
    marginTop: 50,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    email: state.createAccount.email,
    username: state.createAccount.username,
    password: state.createAccount.password,
    error: state.createAccount.error,
    errorMessage: state.createAccount.errorMessage,
    loading: state.createAccount.loading
  };
};

const actions = {
  onCreateAccountButtonPressed,
  createAccountCloseAlert
};

export default connect(mapStateToProps, actions)(CreateAccountScreen);
