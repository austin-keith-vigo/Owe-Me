import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button
} from 'react-native';
import GLOBALS from './../Globals';
import SingletonClass from './../SingletonClass';
import {resetAction} from './../../App';
import {willUpdateWithNewRecord} from './../FirebaseActions';

class ConfirmationScreen extends Component{

    //Configure header
    static navigationOptions = ({navigation}) => {
      return {
        title: 'Confirmation',
        headerRight: (
          <Button
            onPress={()=>{
              //Get navigation items
              const selectedFriends = navigation.getParam('selectedFriends');
              const totalAmount = navigation.getParam('totalAmount');

              //Calculate the amount
              const numberOfPeople = selectedFriends.length + 1;
              const amountPerPerson = totalAmount / numberOfPeople;

              const recordData = {};
              selectedFriends.forEach((friend)=>{
                recordData[friend] = amountPerPerson;
              })
              var record = navigation.getParam('record');
              record.setData(recordData)

              //Update the Singleton with new record
              SingletonClass.getInstance().addNewRecord(record);

              //Update Firebase with new record
              willUpdateWithNewRecord(record).then(()=>{
                navigation.dispatch(resetAction);
              });
            }}
            title="Finish"
          />
        ),
        headerStyle: {
          backgroundColor: GLOBALS.COLORS.GREEN,
          borderBottomWidth: 0
        }
      };
    };

  //Variable for FlatList data
  friends = [];

  constructor(props){
    super(props);

    //Get FlatList data ready
    const friendsData = this.props.navigation.getParam('selectedFriends');
    index = 0;
    friendsData.forEach((friend) => {
      this.friends.push({key: index.toString() ,value: friend});
      ++index;
    })
  }

  //Controls how to render the flatlist item
  _renderListItem = ({item}) => (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>
        {item.value}
      </Text>
    </View>
  );

  render(){
    return(
      <View>
        <FlatList
          data={this.friends}
          renderItem={this._renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    height: 40,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    left: 5
  }
});

export default ConfirmationScreen;
