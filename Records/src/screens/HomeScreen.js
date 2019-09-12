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
import HomeFlatListTile from './../components/HomeFlatListTile';
import GLOBALS from './../Globals';

class HomeScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: '',
    headerStyle: {
      height: 0,
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0
    }
  };

  flatListData = [];

  //Grab the user's data and update the Singleton with the records
  //Populate the flatListData array with the records and at the end
  //A add record button
  constructor(props){
    super(props);

    this.flatListData = SingletonClass.getInstance().getRecords();

    //Create the flatlist tiles
    for(index = 0; index < this.flatListData.length; ++index){
      const currentRecord = this.flatListData[index];

      //Convert each index to a component to be rendered by flat list
      this.flatListData[index] =
        <HomeFlatListTile
          isImage = {false}
          title = {currentRecord.getTitle()}
          amount = {currentRecord.getTotalAmount()}
          onPress={()=>{
           this.props.navigation.navigate("Record", { record: currentRecord })
         }}
        />;
    }

    //Make the last index of the list into an add record button
    this.flatListData.push(
      <HomeFlatListTile
        isImage = {true}
        onPress={()=>{
         this.props.navigation.navigate("AddRecord")
       }}
      />
    );
  }

  render(){
    return(
      <View style={styles.viewStyle}>
      <FlatList
        data={this.flatListData}
        renderItem={(item) => (
          <View>
            {item.item}
            {console.log(item.index)}
          </View>
        )}
        numColumns = {2}
        keyExtractor={(item,index)=>index.toString()}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: GLOBALS.COLORS.GREEN,
    alignItems: 'center'
  },
  flatListStyle: {
    flex: 1,
    width: "100%"
  }
})

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

export default HomeScreen;
