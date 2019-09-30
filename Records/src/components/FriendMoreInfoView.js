import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import SingletonClass from './../SingletonClass';
import GLOBALS from './../Globals';

class FriendMoreInfoView extends Component {

  recordsData = [];

  constructor(props) {
    super(props);

    //Get all the records for the friend
    this.recordsData = SingletonClass.getInstance().getRecordsForFriend(this.props.friend);
  };

  renderFlatList() {
    if(this.recordsData.length > 0) {
      return (
        <FlatList
          data={this.recordsData}
          renderItem={({item, index}) =>
            <View style={styles.listViewStyle}>

              <Text style={styles.titleStyle}>
                {item.title}
              </Text>

              <View style={{flex: 1}}/>

              <Text style={styles.amountOwedStyle}>
                ${item.amountOwed}
              </Text>
            </View>
          }
          keyExtractor={({index}) => index}
        />
      );
    }
    else {
      return (
        <View style={{height: 50, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            No Records Yet
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        {this.renderFlatList()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    backgroundColor: GLOBALS.COLORS.GREEN,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  listViewStyle: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },
  titleStyle: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  amountOwedStyle: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: 'bold'
  }
}
export default FriendMoreInfoView;
