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
        <Button
          title={this.props.buttonTitle}
          onPress={()=>{this.props.buttonPressed(this.state.email, this.state.password)}}
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
