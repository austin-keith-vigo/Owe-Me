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

import { connect } from 'react-redux';

class HomeScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: 'Home',
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

    const recordsData = this.props.records;

    //Create the flatlist tiles
    for(index = 0; index < this.props.records.length; ++index){
      const currentRecord = this.props.records[index];

      //Convert each index to a component to be rendered by flat list
      this.flatListData.push(
        <HomeFlatListTile
          isImage = {false}
          title = {currentRecord.getTitle()}
          amount = {currentRecord.getTotalAmount()}
          onPress={()=>{
           this.props.navigation.navigate("Record", { record: currentRecord })
         }}
        />
      );
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
        {console.log(this.props)}
        <FlatList
          data={this.flatListData}
          renderItem={(item) => (
            <View>
              {item.item}
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

const mapStateToProps = state => {
  return{
    records: state.home.records
  };
};


export default connect(mapStateToProps)(HomeScreen);
