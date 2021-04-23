import { combineReducers } from 'redux'
import login from './login';
import roles from './roles';
import user from './user';
import clients from './clients';
import template from './template';

export default combineReducers({
  login,
  user,
  roles,
  clients,
  template
})