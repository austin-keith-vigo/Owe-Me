import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const CommonButton = (props) => {
  return(
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View style={styles.buttonViewStyle}>
        <Text style={styles.buttonTextStyle}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonViewStyle: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonTextStyle:{
    fontSize: 20
  }
});

export default CommonButton;
