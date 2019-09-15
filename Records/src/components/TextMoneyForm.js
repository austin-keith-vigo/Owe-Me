import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

class TextMoneyForm extends Component{
  render(){
    return(
      <View>
        <TextInput style={styles.titleTextInputField}
          onChangeText={this.props.onChangeTextTitle}
        />
        <View style={styles.moneyInputFieldViewStyle}>
          <Text>$</Text>
          <TextInput
            style={styles.moneyInputField}
            onChangeText={this.props.onChangeTextValue}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  moneyInputFieldViewStyle:{
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray'
  },
  moneyInputField:{
    flex: 1,
    height: 40,
    paddingLeft: 6
  },
  titleTextInputField: {
    height: 40,
    paddingLeft: 6,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray'
  }
})


export default TextMoneyForm;
