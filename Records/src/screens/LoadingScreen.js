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

  _animateAway(email, password, endFunc) {
    this.xPos.setValue(0);
    Animated.timing(
      this.xPos,
      {
        toValue: 1,
        duration: 2000
      }
    ).start(() => endFunc());
  }

  //Try to login the user asynchronously
  constructor(props) {
    super(props);
    this.xPos = new Animated.Value(0);
    this._getLoginCredentials()
      .then(({email, password})=>{
        this._animateAway(email, password, () => {
          this.props.loginUser(email, password, this.props.navigation);
        });
      });
  }

  //Get Login Credentials
  _getLoginCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if(email == null || password == null){
        //Email and password is not settings
        this._animateAway('','',()=>this.props.navigation.navigate('Login'));
      } else {
        return {email: email, password: password};
      }
    } catch (error) {
    }
  }

  render(){
    //Set values for animation
    const pos = this.xPos.interpolate({
       inputRange: [0,1],
       outputRange: [-35, -350]
     });

    return(
      <View style={styles.viewStyle}>
        <Animated.View style={
          {
            height: 300,
            width: 350,
            backgroundColor: GLOBALS.COLORS.DARK_GREEN,
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'absolute',
            top: GLOBALS.SCREEN_HEIGHT * .1,
            left: -35,
            borderRadius: 35,
            transform: [{translateX: pos}]
          }
        }>
          <Text style={styles.textStyle}>Records</Text>
        </Animated.View>
      </View>
    );
  }
};

const styles = {
  viewStyle: {
    backgroundColor: GLOBALS.COLORS.GREEN,
    flex: 1,
  },
  titleView: {
    height: 300,
    width: 350,
    backgroundColor: GLOBALS.COLORS.DARK_GREEN,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    top: GLOBALS.SCREEN_HEIGHT * .1,
    left: -35,
    borderRadius: 35
  },
  textStyle: {
    fontFamily: GLOBALS.FONT,
    fontSize: 60,
    marginRight: 20,
    color: 'white'
  }
};

export default connect(null,{loginUser})(LoadingScreen);
