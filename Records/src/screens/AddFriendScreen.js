import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native';
import {getAllUsernames} from './../FirebaseActions';
import GLOBALS from './../Globals';
import SingletonClass from './../SingletonClass';
import { SearchBar } from 'react-native-elements'

import { connect } from 'react-redux';
import {
  updateSearchValue
} from './../actions';

import { Header, HeaderButton } from './../components';

class AddFriendScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Add Friends',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
    }
  };

  sendFriendRequest(username){
    console.log('sending friend request to ' + username);
  }

  //Controls how each row looks
  _renderItem(item){
    const username = item.item;

    return (
      <View style={styles.listRowViewStyle}>
        <Text style={styles.listTextStyle}>{username}</Text>
        <View style={{flex: 1}}/>
        <Button
          style={styles.buttonStyle}
          title='send'
          onPress={() => this.sendFriendRequest(username)}
        />
      </View>
    );
  };

  updateSearch(text){
    this.props.updateSearchValue(text, this.props.nonFriends);
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <Header
          header="Send Friend Request"
          leftButton={
            <HeaderButton
              title="Back"
              onPress={()=>this.props.navigation.pop()}
            />
          }
        />
        <SearchBar
          containerStyle={{backgroundColor: 'white'}}
          inputContainerStyle={{backgroundColor: 'white'}}
          placeholder="Type Here..."
          onChangeText={(text)=>this.updateSearch(text)}
          value={this.props.searchValue}
        />
        <FlatList
          data={this.props.foundUsernames}
          renderItem={({item}) => this._renderItem({item})}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1
  },
  listRowViewStyle: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5
  },
  buttonStyle: {
    marginRight: 5
  }
});

const mapStateToProps = state => {
  return {
    nonFriends: state.friends.nonFriends,
    searchValue: state.friends.searchValue,
    foundUsernames: state.friends.foundUsernames
  }
}
export default connect(mapStateToProps, { updateSearchValue })(AddFriendScreen);
