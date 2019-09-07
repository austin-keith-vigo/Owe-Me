import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';

class HomeScreen extends Component{
  render(){
    return(
      <View>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
          horizontalMode="true"
        />
      </View>
    );
  }
}

export default HomeScreen;
