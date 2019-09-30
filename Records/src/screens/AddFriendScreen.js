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
  updateSearchValue,
} from './../actions';

import { Header, HeaderButton, AddFriendRow } from './../components';

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

  //Controls how each row looks
  _renderItem(item){
    const username = item.item;

    return (
      <AddFriendRow
        username={username}
      />
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
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          placeholder="Friend's username: "
          onChangeText={(text)=>this.updateSearch(text)}
          value={this.props.searchValue}
          autoCapitalize = 'none'
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
  containerStyle: {
    backgroundColor: 'white'
  },
  inputContainerStyle: {
    backgroundColor: 'white',
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
