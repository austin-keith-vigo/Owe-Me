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
import Dialog from "react-native-dialog";

class SelectFriendsScreen extends Component{

  //Configure header
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Select Friends',
      headerRight: (
        <Button
          onPress={()=>{
            navigation.navigate('Confirmation',{
              selectedFriends: SelectFriendsScreen.selectedFriends,
              totalAmount: navigation.getParam("totalAmount"),
              record: navigation.getParam("record")
            })
          }}
          title="Next"
        />
      ),
      headerStyle: {
        backgroundColor: GLOBALS.COLORS.GREEN,
        borderBottomWidth: 0
      }
    };
  };

  state={showAlert: false};
  errorMessage = "Please select a friend";
  friends = [];         //For FlatList
  static selectedFriends = []; //Friends part of the bill

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
    if(SelectFriendsScreen.selectedFriends.includes(selectedFriend)){
      var replacementFriendList = [];
      for (index = 0; index < SelectFriendsScreen.selectedFriends.length; ++index){
        if(SelectFriendsScreen.selectedFriends[index] != selectedFriend){
          replacementFriendList.push(SelectFriendsScreen.selectedFriends[index]);
        }
      }
      SelectFriendsScreen.selectedFriends = replacementFriendList;
    }

    //Add the selected friend
    else{
      SelectFriendsScreen.selectedFriends.push(selectedFriend);
    }
  }

  //Distributes the bill and finishes the record by updating data
  //To singleton and Firebase
  finishedSelecting(){

    //Show alert
    if (SelectFriendsScreen.selectedFriends.length == 0) {
      this.toggleShowAlertState();
    }
    else {
      const numberOfPeople = SelectFriendsScreen.selectedFriends.length + 1;
      const totalOfBill = this.props.navigation.getParam('totalAmount')
      const amountPerPerson = totalOfBill / numberOfPeople;

      const recordData = {};
      SelectFriendsScreen.selectedFriends.forEach((friend)=>{
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
  }

  //Controls whether or not to present alert
  toggleShowAlertState(){
    this.setState({showAlert: !this.state.showAlert});
  }

  render(){
    return(
      <View>
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.errorMessage}</Dialog.Title>
          <Dialog.Button
            label="Close"
            onPress={this.toggleShowAlertState.bind(this)}
          />
        </Dialog.Container>
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
