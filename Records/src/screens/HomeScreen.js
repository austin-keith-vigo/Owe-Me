import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';
import SingletonClass from './../SingletonClass';
import Record from './../Record';

class HomeScreen extends Component{

  state = {gotData: false}
  flatListData = []

  //Grab the user's data and update the Singleton with the records
  componentDidMount(){
    this.flatListData = SingletonClass.getInstance().getRecords();
    this.setState({gotData: true});
  }

  render(){
    return(
      <View>
        <FlatList
          data={this.flatListData}
          renderItem={({item}) => (
            <View>
              <Button
                title={item.getTitle()}
                onPress={()=>{
                  this.props.navigation.navigate("Record", { record: item });
                }}
              />
            </View>
          )}
          horizontalMode="true"
        />
        <Button
          title="Add Record"
          onPress={()=>{
            this.props.navigation.navigate("AddRecord");
          }}
        />
        <Button
          title="To Friends Screen"
          onPress={()=>{
            this.props.navigation.navigate("Friends");
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;
