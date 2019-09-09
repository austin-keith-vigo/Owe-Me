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

    var filepath = SingletonClass.getInstance().getUserUID();
    var databaseRef = firebase.database().ref(filepath);

    databaseRef.once('value')
    .then((snapshot)=>{

      //Set singleton username
      SingletonClass.getInstance().setUsername(snapshot.val()['username']);

      //Set SingletonRecords
      const recordsData = snapshot.val()['records'];
      for (var key in recordsData){
        var newRecord = new Record(key, recordsData[key]);
        SingletonClass.getInstance().addRecord(newRecord);
      }
      this.flatListData = SingletonClass.getInstance().getRecords();

      //Set Singleton friends
      const friendsData = snapshot.val()['friends'];
      for (var key in friendsData){
        SingletonClass.getInstance().addFriend(key, friendsData[key]);
      }
      this.setState({ gotData: true });
    });
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
