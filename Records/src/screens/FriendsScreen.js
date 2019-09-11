import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import SingletonClass from './../SingletonClass';

class FriendsScreen extends Component{

  //Dictionary of all friends and how much the user owes them
  friends = [];

  //Initialize the friends attribute from Singleton
  constructor(props){
    super(props);

    friendsData = SingletonClass.getInstance().getFriends();
    for (key in friendsData){
      this.friends.push({'key': key, 'value': friendsData[key]});
    }
  }

  render(){
    return(
      <View>
        <FlatList
          data={this.friends}
          renderItem={({item}) => (
            <Text>
              {item.key} : {item.value}
            </Text>
          )}
        />
      </View>
    );
  }
}

export default FriendsScreen;
