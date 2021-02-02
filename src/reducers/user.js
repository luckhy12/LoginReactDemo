// import { get } from "lodash";
import ActionConstants from '../config/AppConstants';
const innitialData = {
  usersListData: {
      data : [],
  },
};
export default function user(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_USERS_LIST: {
      return {
        ...state,
        loginData: action.data,
      };
    }
    default:
      return { ...state };
  }
}
