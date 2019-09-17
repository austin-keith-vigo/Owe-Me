import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import GLOBALS from './../Globals';
import {firebaseSignOut} from './../FirebaseActions';
import SingletonClass from './../SingletonClass';

class SettingsScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Add Friends',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  //Signs the user out of the app
  signUserOut(){

    //Clear SingletonClass and Sign out of firebase
    SingletonClass.getInstance().clearSingleton();
    firebaseSignOut().then(()=>{
      //Go Back to Login Screen
      this.props.navigation.navigate('Auth');
    }).catch((error)=>{
      console.log(error.message);
    });
  }

  render(){
    return(
      <View>
        <Button
          title="Sign Out"
          onPress={this.signUserOut.bind(this)}
        />
      </View>
    );
  }
}

export default SettingsScreen;
