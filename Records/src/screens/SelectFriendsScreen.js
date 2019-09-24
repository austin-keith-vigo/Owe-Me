import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import SingletonClass from './../SingletonClass';
import GLOBALS from './../Globals';

import {
  FriendFlatListItem,
  Alert,
  Header,
  HeaderButton
} from './../components';

import { connect } from 'react-redux';
import {
  addSelectedFriend,
  removeSelectedFriend,
  buttonPressedSelectFriends,
  closeAlertSelectFriends,
  onBackButtonPressedSelectFriends
} from './../actions';


class SelectFriendsScreen extends Component{

  //Configure header
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Select Friends',
      headerStyle: {
        backgroundColor: GLOBALS.COLORS.GREEN,
        borderBottomWidth: 0,
        height: 0
      }
    };
  };

  friends = [];         //For FlatList

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

  //Finalizes the record and sends to confirmation
  onButtonPress() {
    const { newRecord, selectedFriends, amount, navigation } = this.props;
    this.props.buttonPressedSelectFriends(newRecord, selectedFriends, amount, navigation);
  }

  //Closes Alert
  closeAlert() {
    this.props.closeAlertSelectFriends();
  }

  render(){
    return(
      <View>
        <Header
          header={'SELECT FRIENDS'}
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => {
                this.props.onBackButtonPressedSelectFriends(this.props.navigation);
              }}
            />}
          rightButton={
            <HeaderButton
              title='CONFIRM'
              onPress={this.onButtonPress.bind(this)}
            />}
        />

        <FlatList
          data={this.friends}
          renderItem={({item}) => (
            <FriendFlatListItem
              friend={item.key}
              onPress={() => this.friendSelected(item.key)}
            />
          )}
        />

        <Button
          title="Next"
          onPress={this.onButtonPress.bind(this)}
        />

        <Alert
          isVisible={this.props.errorSelectFriends}
          errorMessage={this.props.errorMessageSelectFriends}
          closeAlert={this.closeAlert.bind(this)}
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
  removeSelectedFriend,
  buttonPressedSelectFriends,
  closeAlertSelectFriends,
  onBackButtonPressedSelectFriends
};

export default connect(mapStateToProps, actions)(SelectFriendsScreen);
