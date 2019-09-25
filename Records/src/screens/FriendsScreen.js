import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import GLOBALS from './../Globals';

import { Header, HeaderButton } from './../components';

import { connect } from 'react-redux';
import { getNonFriends } from './../actions';

class FriendsScreen extends Component{

  state={gotFlatListData: false};

  //Configure header
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Friends',
      headerStyle: {
        backgroundColor: GLOBALS.COLORS.GREEN,
        borderBottomWidth: 0,
        height: 0
      }
    };
  };

  //Data prop for flatlist
  friendsList = [];

  constructor(props) {
    super(props);

    //friends given as a object, need to convert to array for flatlist
    this.friendsList = Object.keys(this.props.friends).map((key)=>{
      return {key: key, value: {friendName: key, amountOwed: this.props.friends[key]}};
    });
  }

  //renders items for flatlist
  _renderItem(item){
    return (
      <View>
        <Text>{item.friendName}</Text>
        <Text>{item.amountOwed}</Text>
      </View>
    );
  }

  //right header button functionality
  onRightHeaderButtonPressed() {
    this.props.getNonFriends(this.props.friends, this.props.navigation);
  }

  render(){
    return(
      <View>
        <Header
          header='Friends'
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => {
                this.props.onBackButtonPressedAddRecord(this.props.navigation);
              }}
            />}
          rightButton={
            <HeaderButton
              title='ADD FRIEND'
              onPress={this.onRightHeaderButtonPressed.bind(this)}
            />}
        />

        <FlatList
          data={this.friendsList}
          renderItem={({item})=> this._renderItem(item.value)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends.friends
  };
};

export default connect(mapStateToProps,{ getNonFriends })(FriendsScreen);
