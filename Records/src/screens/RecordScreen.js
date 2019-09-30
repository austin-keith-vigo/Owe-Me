import React,{Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import SingletonClass from './../SingletonClass';
import GLOBALS from './../Globals';

import {
  Header,
  HeaderButton,
  RecordFlatListItem
} from './../components';

class RecordScreen extends Component{

  //Configure header
  static navigationOptions = {
    title: "",
    headerStyle: {
      backgroundColor: GLOBALS.COLORS.GREEN,
      borderBottomWidth: 0,
      height: 0
    }
  };

  flatListDataProp = [];
  recordTitle = '';

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
    this.recordTitle = this.props.navigation.getParam('record').getTitle();
  }

  render(){
    return(
      <View style = {styles.viewStyle}>
        <Header
          header={this.recordTitle.toUpperCase()}
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => this.props.navigation.pop()}
            />}
        />

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
