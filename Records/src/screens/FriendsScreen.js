import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Button
} from 'react-native';
import SingletonClass from './../SingletonClass';
import GLOBALS from './../Globals';
import RecordFlatListItem from './../components/RecordFlatListItem';
import { NavigationEvents } from "react-navigation";

class FriendsScreen extends Component{

  state={gotFlatListData: false};
  
  //Configure header
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Friends',
      headerRight: (
        <Button
          onPress={()=>{ //Go to confirmation screen
            navigation.navigate('AddFriends')
          }}
          title="Add Friend"
        />
      ),
      headerStyle: {
        backgroundColor: GLOBALS.COLORS.GREEN,
        borderBottomWidth: 0
      }
    };
  };

  //Dictionary of all friends and how much the user owes them
  friends = [];
  flatListDataProp = [];

  //Initialize the friends attribute from Singleton
  setFlatListDataProp(){
    const friendsData = SingletonClass.getInstance().getFriends();
    for(key in friendsData){
      var newFlatListRow =
        <RecordFlatListItem
          title={key}
          amount={friendsData[key]}
        />;

      this.flatListDataProp.push({"key": key, "value": newFlatListRow});
    };
  }

  //Conditional rendering to render flatList
  renderFlatList(){
    if(this.state.gotFlatListData == true){
      return(
        <FlatList
          data={this.flatListDataProp}
          renderItem={({item}) => (
            <View>{item.value}</View>
          )}
        />
      );
    }
  }

  render(){
    return(
      <View>
      <NavigationEvents
        onWillFocus={payload => {
          this.setFlatListDataProp();
          this.setState({gotFlatListData: true});
        }}
        onDidBlur={payload => {
          this.flatListDataProp = [];
          this.setState({gotFlatListData: false});
        }}
      />
        {this.renderFlatList()}
      </View>
    );
  }
}

export default FriendsScreen;
