// import { get } from "lodash";
import ActionConstants from "../config/AppConstants";
const innitialData = {
  customerListData: {},
};
export default function customer(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_ALL_CUSTOMERS: {
      return {
        ...state,
        customerListData: action.data,
      };
    }
    default:
      return { ...state };
  }
}
