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

import { connect } from 'react-redux';
import { addSelectedFriend, removeSelectedFriend } from './../actions';

class SelectFriendsScreen extends Component{

  //Configure header
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Select Friends',
      headerStyle: {
        backgroundColor: GLOBALS.COLORS.GREEN,
        borderBottomWidth: 0
      }
    };
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
    if(this.props.selectedFriends.includes(selectedFriend)) {
      this.props.removeSelectedFriend(selectedFriend, this.props.selectedFriends);
    } else {
      this.props.addSelectedFriend(selectedFriend, this.props.selectedFriends);

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
              onPress={() => {
                this.friendSelected(item.key)
              }}
            />
          )}
        />
        <Button
          title="Next"
          onPress={()=>{

            //Set the parameters for the next screen
            const parameters = {
              selectedFriends: this.selectedFriends,
              totalAmount: this.props.navigation.getParam("totalAmount"),
              record: this.props.navigation.getParam("record")
            };
            this.props.navigation.navigate('Confirmation', parameters);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    amount: state.home.amount,
    newRecord: state.home.newRecord,
    errorSelectFriends: state.home.errorSelectFriends,
    errorMessageSelectFriends: state.home.errorMessageSelectFriends,
    selectedFriends: state.home.selectedFriends
  };
};

const actions = {
  addSelectedFriend,
  removeSelectedFriend
};

export default connect(mapStateToProps, actions)(SelectFriendsScreen);
