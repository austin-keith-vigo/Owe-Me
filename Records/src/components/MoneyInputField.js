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
      <View style={styles.viewStyle}>
        <View style={styles.dollarSignViewStyle}>
          <Text style={styles.dollarSignStyle}>$</Text>
        </View>
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
  viewStyle:{
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 2,
    width: 300
  },
  dollarSignViewStyle:{
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10
  },
  dollarSignStyle:{
    fontSize: 18
  },
  textInputStyle:{
    flex: 1,
    height: 40,
    fontSize: 18,
    lineHeight: 18,
    borderWidth: 2
  }
});

export default MoneyInputField;
