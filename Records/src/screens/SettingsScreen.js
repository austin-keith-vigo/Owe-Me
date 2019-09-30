import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import GLOBALS from './../Globals';



import {
  signUserOut
} from './../actions';

import { Header } from './../components';
import SingletonClass from './../SingletonClass';
import {firebaseSignOut} from './../FirebaseActions';

import { connect } from 'react-redux';

class SettingsScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
    }
  };

  //Gets the first letter of the user's username
  getLetter() {
    const username = SingletonClass.getInstance().getUsername();
    const letter = username[0];
    return letter.toUpperCase();
  }

  render(){
    return(
      <View style={styles.mainViewStyle}>

        <Header
          header="SETTINGS"
        />

        <View style={styles.iconBackgroundViewStyle}>
          <View style={styles.iconUsernameView}>
            <View style={styles.iconViewStyle}>
              <Text style={styles.iconTextStyle}>{this.getLetter()}</Text>
            </View>
            <Text style={styles.usernameStyle}>
              {SingletonClass.getInstance().getUsername()}
            </Text>
          </View>
        </View>

        <View style={styles.buttonsViewStyle}>
          <TouchableOpacity
            onPress={()=>this.props.signUserOut()}
          >
            <View style={styles.setttingsButtonViewStyle}>
              <Text style={styles.settingsButtonTextStyle}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = {
  mainViewStyle: {
    flex: 1
  },
  buttonsViewStyle: {
    marginBottom: 50
  },
  iconUsernameView: {
    position: 'absolute',
    top: 50
  },
  iconBackgroundViewStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  iconViewStyle: {
    height: 250,
    width: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLORS.GREEN
  },
  iconTextStyle:{
    fontSize: 150,
    fontWeight: 'bold'
  },
  setttingsButtonViewStyle: {
    height: 50,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    justifyContent:'center'
  },
  usernameStyle: {
    fontSize: 55,
    fontWeight: 'bold',
  },
  settingsButtonTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
  }
};

export default connect(null, {signUserOut})(SettingsScreen);
