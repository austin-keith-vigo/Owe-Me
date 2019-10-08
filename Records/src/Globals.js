//Common constants used throughout the app
import {Dimensions} from 'react-native';

export default {
  COLORS: {
    GREEN: "#CFF0CC",
    DARK_GREEN: "#90A88E",
    BLUE: '#5fC9F8',
    RED: '#FC3158'
  },
  FONT: 'Helvetica-Light',
  SCREEN_HEIGHT: Math.round(Dimensions.get('window').height),
  SCREEN_WIDTH: Math.round(Dimensions.get('window').width)
};
