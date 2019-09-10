import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList
} from 'react-native';
import SingletonClass from './../SingletonClass';
import {resetAction} from './../../App';
import {willUpdateWithNewRecord} from './../FirebaseActions';

class SelectFriendsScreen extends Component{

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
  friendSelected = (friend) => {
    if(this.selectedFriends.includes(friend)){
      console.log('they are already selected');
    } else{
      this.selectedFriends.push(friend);
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
    SingletonClass.getInstance().willAddNewRecord(record).then(()=>{
      this.props.navigation.dispatch(resetAction);
    });
  }



  render(){
    return(
      <View>
      <FlatList
        data={this.friends}
        renderItem={({item}) => (
          <Button
            title = {item.key}
            onPress={()=>{
              this.friendSelected(item.key);
            }}
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

export default SelectFriendsScreen;
