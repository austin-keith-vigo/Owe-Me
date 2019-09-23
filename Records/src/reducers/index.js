import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import ForgotPasswordReducers from './ForgotPasswordReducers'

export default combineReducers({
  login: LoginReducers,
  forgotPassword: ForgotPasswordReducers
});
