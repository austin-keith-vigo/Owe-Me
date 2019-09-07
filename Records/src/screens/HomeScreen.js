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

  //State to render screen again after retrieved data and store in class member
  state={ gotData: false };
  flatListData = []

  //Grab the user's data and update the Singleton with the records
  constructor(props){
    super(props);

    var filepath = SingletonClass.getInstance().getUserUID() + '/records';
    var databaseRef = firebase.database().ref(filepath);

    databaseRef.once('value').then((snapshot)=>{
      snapshot.forEach((record)=>{
        var newRecord = new Record(record);
        SingletonClass.getInstance().addRecord(newRecord);
      })
      this.flatListData = SingletonClass.getInstance().getRecords();
      this.setState({ gotData: true });
    })
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
                console.log(item.getTitle());
              }}
            />
          )}
          horizontalMode="true"
        />
      </View>
    );
  }
}

export default HomeScreen;
