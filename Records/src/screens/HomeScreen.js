import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';
import SingletonClass from './../SingletonClass';
import Record from './../Record';

class HomeScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      height: 0,
      backgroundColor: "#237a3b",
      borderBottomWidth: 0
    }
  };

  flatListData = []

  //Grab the user's data and update the Singleton with the records
  constructor(props){
    super(props);
    this.flatListData = SingletonClass.getInstance().getRecords();

    //Put the Add Record button at the end of the flat list
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <FlatList
          data={this.flatListData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>{
              this.props.navigation.navigate("Record", { record: item })
            }}>
              <View style={styles.recordTileStyle}>
                <Text style={styles.recordTextTitleStyle}>
                  {item.getTitle()}
                </Text>
                <Text>${item.getTotalAmount()}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns = {2}
        />
      </View>
    );
  }
}

// <Button
//   title="Add Record"
//   onPress={()=>{
//     this.props.navigation.navigate("AddRecord");
//   }}
// />
// <Button
//   title="To Friends Screen"
//   onPress={()=>{
//     this.props.navigation.navigate("Friends");
//   }}
// />
// <Button
//   title="To Notifications Screen"
//   onPress={()=>{
//     this.props.navigation.navigate("Notifications");
//   }}
// />

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: "#237a3b",
    alignItems: 'center'
  },
  recordTileStyle:{
    width: 150,
    height: 150,
    backgroundColor: 'gray',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  recordTextTitleStyle: {
    fontSize: 20
  },
  recordTotalStyle: {
    fontSize: 18
  }
})

export default HomeScreen;
