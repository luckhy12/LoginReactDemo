// import { get } from "lodash";
import ActionConstants from '../config/AppConstants';
const innitialData = {
  loginData: {},
  showLogoutPopUp: false,
};
export default function login(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.SAVE_LOGIN_DATA: {
      return {
        ...state,
        loginData: action.data,
      };
    }
    default:
      return { ...state };
  }
}
