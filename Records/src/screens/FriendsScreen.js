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

class FriendsScreen extends Component{

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
  constructor(props){
    super(props);

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

  render(){
    return(
      <View>
        <FlatList
          data={this.flatListDataProp}
          renderItem={({item}) => (
            <View>{item.value}</View>
          )}
        />
      </View>
    );
  }
}

export default FriendsScreen;
