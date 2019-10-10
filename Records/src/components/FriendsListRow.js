import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GLOBALS from './../Globals';
import { connect } from 'react-redux';
import { changeSelectedFriendRow } from './../actions';
import FriendMoreInfoView from './FriendMoreInfoView';
//Renders an icon next to the user
const getLetterIcon = (friendName) => {
  return(
    <View style={styles.iconBackgroundStyle}>
      <Text style={styles.iconLetterStyle}>{friendName[0].toUpperCase()}</Text>
    </View>
  );
};

//update the state
const rowPressed = (friendName, selectedFriendRow, changeSelectedFriendRow) => {
  changeSelectedFriendRow(friendName);
}

//Render a view below to show user all the records that are owed by that friend
const renderMoreInfoView = (friendName, selectedFriendRow) => {
  if(friendName == selectedFriendRow){
    return (
      <FriendMoreInfoView
        friend={friendName}
      />
    );
  }
}

const FriendsListRow = ({friendName, amountOwed, selectedFriendRow, changeSelectedFriendRow}) => {
  return (
    <TouchableOpacity
      onPress={() => rowPressed(friendName, selectedFriendRow,changeSelectedFriendRow)}
    >
      <View>
        <View style={styles.viewStyle}>
          {getLetterIcon(friendName, selectedFriendRow)}

          <Text style={styles.friendNameStyle}>{friendName}</Text>

          <View style={{flex:1}}></View>

          <Text style={styles.amountOwedStyle}>${amountOwed}</Text>
        </View>
        {renderMoreInfoView(friendName, selectedFriendRow)}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  viewStyle: {
    flexDirection:'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  friendNameStyle: {
    fontSize: 18,
    fontFamily: GLOBALS.FONT,
    marginLeft: 5
  },
  amountOwedStyle: {
    fontSize: 18,
    fontFamily: GLOBALS.FONT,
    marginRight: 5
  },
  iconBackgroundStyle: {
    backgroundColor: GLOBALS.COLORS.GREEN,
    borderRadius: 40,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40
  },
  iconLetterStyle: {
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: GLOBALS.FONT
  }
};

const mapStateToProps = state => {
  return {
    selectedFriendRow: state.friends.selectedFriendRow
  };
};

const actions = {
  changeSelectedFriendRow,
};

export default connect(mapStateToProps, actions)(FriendsListRow);
