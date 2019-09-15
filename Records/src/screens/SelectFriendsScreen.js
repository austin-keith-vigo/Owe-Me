import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import SingletonClass from './../SingletonClass';
import {resetAction} from './../../App';
import {willUpdateWithNewRecord} from './../FirebaseActions';
import GLOBALS from './../Globals';
import FriendFlatListItem from './../components/FriendFlatListItem';

class SelectFriendsScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Select Friends',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  friends = [];         //For FlatList
  selectedFriends = []; //Friends part of the bill

  //Initialize friends attribute for data prop of FlatList
  constructor(props){
    super(props);

    friendsData = SingletonClass.getInstance().getFriends();
    for (key in friendsData){
      this.friends.push({'key': key, 'value': friendsData[key]});
    }
  }

  //Marks a friend as selected and includes them in the bill
  friendSelected = (selectedFriend) => {

    //Remove the selected friend from the list
    if(this.selectedFriends.includes(selectedFriend)){
      var replacementFriendList = [];
      for (index = 0; index < this.selectedFriends.length; ++index){
        if(this.selectedFriends[index] != selectedFriend){
          replacementFriendList.push(this.selectedFriends[index]);
        }
      }
      this.selectedFriends = replacementFriendList;
    }

    //Add the selected friend
    else{
      this.selectedFriends.push(selectedFriend);
    }
  }

  //Distributes the bill and finishes the record by updating data
  //To singleton and Firebase
  finishedSelecting(){
    const numberOfPeople = this.selectedFriends.length + 1;
    const totalOfBill = this.props.navigation.getParam('totalAmount')
    const amountPerPerson = totalOfBill / numberOfPeople;

    const recordData = {};
    this.selectedFriends.forEach((friend)=>{
      recordData[friend] = amountPerPerson;
    })
    var record = this.props.navigation.getParam('record');
    record.setData(recordData)

    //Update the Singleton with new record
    SingletonClass.getInstance().addNewRecord(record);

    //Update Firebase with new record
    willUpdateWithNewRecord(record).then(()=>{
      this.props.navigation.dispatch(resetAction);
    });
  }

  render(){
    return(
      <View>
        <FlatList
          data={this.friends}
          renderItem={({item}) => (
            <FriendFlatListItem
              friend={item.key}
              onPress={this.friendSelected.bind(this,item.key)}
            />
          )}
        />
        <Button
          title="Next"
          onPress={this.finishedSelecting.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{

  }
});
export default SelectFriendsScreen;
