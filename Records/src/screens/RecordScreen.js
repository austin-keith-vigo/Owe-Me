import React,{Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import SingletonClass from './../SingletonClass';
import RecordFlatListItem from './../components/RecordFlatListItem';

class RecordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: "Record",
    headerStyle: {
      backgroundColor: "#237a3b",
      borderBottomWidth: 1,
      borderBottomColor: 'black'
    }
  };

  flatListDataProp = [];

  //recordData = this.props.navigation.getParam('record');
  constructor(props){
    super(props);

    //Turn the data from the record into a list that can be used
    //as the data prop for the flatList
    var recordData = this.props.navigation.getParam('record').getData();
    for(var key in recordData){
      const newRecordFlatListItem =
        <RecordFlatListItem
          title={key}
          amount={recordData[key]}
        />;
      this.flatListDataProp.push({"key": key, "value":newRecordFlatListItem})
    }
  }

  render(){
    return(
      <View style = {styles.viewStyle}>
        <FlatList
          data={this.flatListDataProp}
          renderItem={({item}) => (
            <View>{item.value}</View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    flex: 1,
    backgroundColor: "white"
  }
})

export default RecordScreen;
