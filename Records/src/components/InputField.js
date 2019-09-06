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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle:{
    width: 200,
    height: 20
  }
});

export default InputField;
