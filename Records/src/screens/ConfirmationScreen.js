import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button
} from 'react-native';
import GLOBALS from './../Globals';
import SingletonClass from './../SingletonClass';
import {resetAction} from './../../App';
import {willUpdateWithNewRecord} from './../FirebaseActions';

import { connect } from 'react-redux';
import { confirmButtonPressed } from './../actions';

import { Header, HeaderButton } from './../components'

class ConfirmationScreen extends Component{

    //Configure header
    static navigationOptions = ({navigation}) => {
      return {
        title: 'Confirmation',
        headerRight: (
          <Button
            onPress={()=>{
              //Get navigation items
              const selectedFriends = navigation.getParam('selectedFriends');
              const totalAmount = navigation.getParam('totalAmount');

              //Calculate the amount
              const numberOfPeople = selectedFriends.length + 1;
              const amountPerPerson = totalAmount / numberOfPeople;

              const recordData = {};
              selectedFriends.forEach((friend)=>{
                recordData[friend] = amountPerPerson;
              })
              var record = navigation.getParam('record');
              record.setData(recordData)

              //Update the Singleton with new record
              SingletonClass.getInstance().addNewRecord(record);

              //Update Firebase with new record
              willUpdateWithNewRecord(record).then(()=>{
                navigation.dispatch(resetAction);
              });
            }}
            title="Finish"
          />
        ),
        headerStyle: {
          backgroundColor: GLOBALS.COLORS.GREEN,
          borderBottomWidth: 0,
          height: 0
        }
      };
    };

  //Variable for FlatList data
  friends = [];

  constructor(props){
    super(props);

    //Update the friends attribute to serve as data prop for flatlist
    const newRecordData = this.props.newRecord.getData();
    this.friends= Object.keys(newRecordData).map((key) => {
      return {key: key, amount: newRecordData[key]};
    });

  }

  //Controls how to render the flatlist item
  _renderListItem = ({item}) => (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>
        {item.key}
      </Text>

      <View style={{flex:1}}/>

      <Text style={styles.textStyle}>
        ${item.amount}
      </Text>
    </View>
  );

  rightHeaderButtonPressed(){
    this.props.confirmButtonPressed();
  }

  render(){
    return(
      <View>

        <Header
          header={'Confirmation'}
          leftButton={
            <HeaderButton
              title='BACK'
              onPress={() => this.props.navigation.pop()}
            />}
          rightButton={
            <HeaderButton
              title='CONFIRM'
              onPress={this.rightHeaderButtonPressed.bind(this)}
            />}
        />

        <FlatList
          style={styles.listStyle}
          data={this.friends}
          renderItem={this._renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    height: 40,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10
  }
});

const mapStateToProps = state => {
  return {
    newRecord: state.home.newRecord
  };
};

export default connect(mapStateToProps, { confirmButtonPressed })(ConfirmationScreen);
