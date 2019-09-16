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
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Select Friends',
      headerRight: (
        <Button
          onPress={()=>{ //Go to confirmation screen
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
      </View>
    );
  }
}

export default SelectFriendsScreen;
