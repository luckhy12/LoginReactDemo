// import { get } from "lodash";
import ActionConstants from "../config/AppConstants";
const innitialData = {
  allClientsList: [],
};
export default function clients(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_ALL_CLIENTS: {
      return {
        ...state,
        allClientsList: action.data,
      };
    }
    default:
      return { ...state };
  }
}
