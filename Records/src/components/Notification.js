import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

class Notification extends Component{

  constructor(props){
    super(props);

    //Bind the class functions
    this.paidButtonPressed = this.paidButtonPressed.bind(this);
  }

  //The user has payed the user back and will remove that record from the friend
  paidButtonPressed(){
    console.log(this.test);
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <Text>Notification</Text>
        <Button
          title="paid"
          onPress={this.paidButtonPressed}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    width: "100%"
  }
});

export default Notification;
