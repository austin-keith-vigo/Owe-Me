import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import ForgotPasswordReducers from './ForgotPasswordReducers';
import CreateAccountReducers from './CreateAccountReducers';
import HomeScreenReducers from './HomeScreenReducers';

export default combineReducers({
  login: LoginReducers,
  forgotPassword: ForgotPasswordReducers,
  createAccount: CreateAccountReducers,
  home: HomeScreenReducers
});
