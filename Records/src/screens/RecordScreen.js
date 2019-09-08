import React,{Component} from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import SingletonClass from './../SingletonClass';

class RecordScreen extends Component{

  flatListDataProp = [];

  //recordData = this.props.navigation.getParam('record');
  constructor(props){
    super(props);

    //Turn the data from the record into a list that can be used
    //as the data prop for the flatList
    var recordData = this.props.navigation.getParam('record').getData();
    for(var key in recordData){
      this.flatListDataProp.push({"key": key, "value":recordData[key]})
    }
  }

  render(){
    return(
      <View>
        <FlatList
          data={this.flatListDataProp}
          renderItem={({item}) => (
            <Text>
              {item.key} : {item.value}
            </Text>
          )}
        />
      </View>
    );
  }
}

export default RecordScreen;
