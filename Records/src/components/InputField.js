import React, { Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

class InputField extends Component{
  render(){
    return(
      <View>
        <TextInput
          style={styles.textInputStyle}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize={this.props.autoCapitalize}
          autoCorrect={this.props.autoCorrect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle:{
    width: 300,
    height: 40,
    fontSize: 16,
    lineHeight: 16,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default InputField;
