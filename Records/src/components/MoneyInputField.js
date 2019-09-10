import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

class MoneyInputField extends Component{

  render(){
    return(
      <View>
        <TextInput
          style={styles.textInputStyle}
          keyboardType="number-pad"
          placeholder="0"
          onChangeText={this.props.onChangeText}
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

export default MoneyInputField;
