import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

class TextMoneyForm extends Component{
  render(){
    return(
      <View>
        <TextInput
          style={styles.titleTextInputField}
          onChangeText={this.props.onChangeTextTitle}
          placeholder="Title"
          returnKeyType='done'
          value={this.props.titleValue}
        />
        <View style={styles.moneyInputFieldViewStyle}>
          <Text>$</Text>
          <TextInput
            style={styles.moneyInputField}
            onChangeText={this.props.onChangeTextValue}
            placeholder="0.00"
            returnKeyType='done'
            value={this.props.amountValue}
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
    borderColor: 'gray',
    backgroundColor: 'white',
    width: 300,
    marginBottom: 50
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
    borderColor: 'gray',
    backgroundColor: 'white',
    width: 300,
    marginBottom: 15
  }
})

const mapStateToProps = state => {
  return {
    titleValue: state.home.title,
    amountValue: state.home.amount
  };
};

export default connect(mapStateToProps)(TextMoneyForm);
