import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const HeaderButton = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  }
}

export default HeaderButton;
