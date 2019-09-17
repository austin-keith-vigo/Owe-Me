import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

const PaidNotification = (props) => {
  return(
    <View style={styles.mainViewStyle}>
      {console.log(props.notification)}
      <View style={styles.textViewStyle}>
        <Text style={styles.titleTextStyle}>
          {props.notification['data']['title']}
        </Text>
        <Text style={styles.senderTextStyle}>
          {props.notification['data']['senderUsername']} : payed
        </Text>
      </View>
      <Button
        title="Dismiss"
        onPress={props.dismissButtonPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 40,
    width: "100%",
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  textViewStyle: {
    height: 40,
    flex: 1
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  senderTextStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
export default PaidNotification;
