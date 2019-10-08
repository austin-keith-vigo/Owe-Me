import React, { Component } from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';

import GLOBALS from './../Globals';

class Header extends Component {

  renderRightButton() {
    if(this.props.rightButton) {
      return (
        <View style={styles.rightButtonView}>
          {this.props.rightButton}
        </View>
      );
    }
  }

  renderLeftButton() {
    if(this.props.leftButton) {
      return (
        <View style={styles.leftButtonView}>
          {this.props.leftButton}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>

        <Text style={styles.headerTitleStyle}>{this.props.header}</Text>

        {this.renderLeftButton()}

        {this.renderRightButton()}

      </View>
    );
  }
}

const styles = {
  viewStyle : {
    height: 80,
    width: '100%',
    backgroundColor: GLOBALS.COLORS.GREEN,
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  headerTitleStyle: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: GLOBALS.FONT
  },
  rightButtonView: {
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  leftButtonView: {
    position: 'absolute',
    bottom: 5,
    left: 5
  }
};

export default Header;
