import { combineReducers } from 'redux'
import login from './login';
import roles from './roles';
import user from './user';
import clients from './clients';
import template from './template';
import customer from './customer';
import messageLogs from './report';
import voiceCallLogs from './voiceCallLog';

export default combineReducers({
  login,
  user,
  roles,
  clients,
  template,
  customer,
  messageLogs,
  voiceCallLogs
})