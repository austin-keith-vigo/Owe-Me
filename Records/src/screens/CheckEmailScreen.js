import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class CheckEmailScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Forgot Password',
    headerStyle: {
      backgroundColor: "#237a3b",
      borderBottomWidth: 0
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
    backgroundColor: "#237a3b",
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
