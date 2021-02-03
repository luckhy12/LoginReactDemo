// import { get } from "lodash";
import ActionConstants from "../config/AppConstants";
const innitialData = {
  usersListData: {},
};
export default function user(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_USERS_LIST: {
      return {
        ...state,
        usersListData: action.data,
      };
    }
    default:
      return { ...state };
  }
}
