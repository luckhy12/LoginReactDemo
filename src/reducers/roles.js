// import { get } from "lodash";
import ActionConstants from "../config/AppConstants";
const innitialData = {
  allRolesList: [],
};
export default function roles(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_ALL_ROLES: {
      return {
        ...state,
        allRolesList: action.data,
      };
    }
    default:
      return { ...state };
  }
}
