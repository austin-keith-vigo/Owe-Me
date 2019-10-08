import React, {Component} from 'react'
import {
  View,
  Text,
   Button,
   Animated
} from 'react-native';
import GLOBALS from './../Globals';
import {connect} from 'react-redux';
import {loginUser} from './../actions';
import AsyncStorage from '@react-native-community/async-storage';

class LoadingScreen extends Component {
  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      height: 0,
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //Try to login the user asynchronously
  componentDidMount() {
    this._getLoginCredentials()
      .then(({email, password})=>{
        this.props.loginUser(email, password, this.props.navigation);
      });
  }

  //Get Login Credentials
  _getLoginCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      
      if(email == null || password == null){
        //Email and password is not settings
        this.props.navigation.navigate('Login');
      } else {
        return {email: email, password: password};
      }
    } catch (error) {
      console.log(error);
    }
  }
  render(){
    return(
      <View style={styles.viewStyle}>
        <View style={styles.titleView}>
          {console.log(this.props)}
          <Text>Records</Text>
        </View>
      </View>
    );
  }
};

const styles = {
  viewStyle: {
    backgroundColor: GLOBALS.COLORS.GREEN,
    flex: 1
  },
  titleView: {
    height: '40%',
    width: '80%',
    backgroundColor: 'blue'
  }
};

export default connect(null,{loginUser})(LoadingScreen);
