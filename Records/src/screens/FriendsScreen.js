import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import GLOBALS from './../Globals';

import { Header, HeaderButton, FriendsListRow } from './../components';
import SingletonClass from './../SingletonClass';

import { connect } from 'react-redux';
import { getNonFriends } from './../actions';

class FriendsScreen extends Component{
  //Configure header
  static navigationOptions = ({navigation}) => {
    return {
      title: '',
      headerStyle: {
        backgroundColor: GLOBALS.COLORS.GREEN,
        borderBottomWidth: 0,
        height: 0
      }
    };
  };

  //renders items for flatlist
  _renderItem(item){
    return (
      <FriendsListRow
        friendName={item.friendName}
        amountOwed={item.amountOwed}
      />
    );
  }

  //right header button functionality
  onRightHeaderButtonPressed() {
    this.props.getNonFriends(this.props.friends, this.props.navigation);
  }

  render(){
    return(
      <View style={{flex:1}}>

        <Header
          header='Friends'
          rightButton={
            <HeaderButton
              title='ADD FRIEND'
              onPress={this.onRightHeaderButtonPressed.bind(this)}
            />}
        />

        <FlatList
          data={SingletonClass.getInstance().getFriendsFlatList()}
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
