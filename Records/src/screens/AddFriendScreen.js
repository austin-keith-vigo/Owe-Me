import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {getAllUsernames} from './../FirebaseActions';

class AddFriendScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Add Friends',
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  state={gotUsernames: false};
  flatListData=[];

  //Gets all usernames from database and presents it to flatlist
  constructor(props){
    super(props);

    getAllUsernames().then((value)=>{
      const usersData = value['users'];
      for(index = 0; index < usersData.length; ++index){
        this.flatListData.push({
          key:index.toString(),
          username: usersData[index]["username"],
          uid: usersData[index]['uid']
        });
      }
      this.setState({gotUsernames: true});
    })
  }

  listItemPressed(username,uid){
    console.log(username,uid);
  }
  //Controls how to render the flatlist item
  _renderListItem = ({item}) => (
    <TouchableOpacity
      onPress={this.listItemPressed.bind(this,item.username,item.uid)}
    >
      <View style={styles.listViewStyle}>
        <Text style={styles.listTextSyle}>
          {item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );

  //Conditional rendering to render an item
  renderFlatList(){
    if(this.state.gotUsernames == true){
      return(
        <FlatList
          data={this.flatListData}
          renderItem={this._renderListItem}
        />
      );
    }
  }

  render(){
    return(
      <View>
        {this.renderFlatList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listViewStyle: {
    height: 40,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    justifyContent: 'center'
  },
  listTextSyle: {
    fontSize: 18,
    paddingLeft: 5,
    fontWeight: 'bold'
  }
});

export default AddFriendScreen;
