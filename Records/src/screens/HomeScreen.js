import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import SingletonClass from './../SingletonClass';
import Record from './../Record';

class HomeScreen extends Component{

  flatListData = []

  //Grab the user's data and update the Singleton with the records
  constructor(props){
    super(props);

    this.flatListData = SingletonClass.getInstance().getRecords();
  }


  render(){
    return(
      <View>
        <FlatList
          data={this.flatListData}
          renderItem={({item}) => (
            // <Text>{item.getTitle()}</Text>
            <Button
              title={item.getTitle()}
              onPress={()=>{
                this.props.navigation.navigate("Record", { record: item });
              }}
            />
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
