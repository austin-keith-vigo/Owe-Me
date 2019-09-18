import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

const RecordNotification = (props) => {
  return(
    <View style={styles.mainViewStyle}>
      <View style = {styles.textViewStyle}>
        <Text style = {styles.titleTextStyle}>
          {props.notification['data']['title']}
        </Text>
        <Text style = {styles.senderTextStyle}>
          {props.notification['data']['senderUsername']} : ${props.notification['data']['amount']}
        </Text>
      </View>
      <Button
        title="Paid"
        onPress={props.paidButtonPressed}
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

export default RecordNotification;
