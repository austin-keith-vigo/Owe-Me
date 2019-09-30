import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import GLOBALS from './../Globals';


class CheckEmailScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
    }
  };

  render(){
    return(
      <View style = {styles.viewStyle}>

        <Text style = {styles.textStyle}>Check your email to reset your password</Text>

        <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonStyle}>Go Back To Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle:{
    fontSize: 18,
    fontWeight: "bold",
    position: 'absolute',
    top: 60
  },
  buttonStyle: {
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10
  }
})

export default CheckEmailScreen;
