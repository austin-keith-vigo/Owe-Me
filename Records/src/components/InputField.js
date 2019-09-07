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
    width: "100%",
    height: 40,
    fontSize: 12,
    lineHeight: 12
  }
});

export default InputField;
