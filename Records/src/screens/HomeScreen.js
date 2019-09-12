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

  flatListData = [];

  //Grab the user's data and update the Singleton with the records
  constructor(props){
    super(props);
    this.flatListData = SingletonClass.getInstance().getRecords();
  }

  render(){
    return(
      <View style={styles.viewStyle}>
      <FlatList
        data={this.flatListData}
        renderItem={({item}) => (
          <HomeFlatListTile
            record={item}
            onPress={()=>{
             this.props.navigation.navigate("Record", { record: item })
           }}
          />
        )}
        numColumns = {2}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: "#237a3b",
    alignItems: 'center'
  },
  flatListStyle: {
    flex: 1,
    width: "100%"
  }
})

export default HomeScreen;
