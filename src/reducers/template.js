// import { get } from "lodash";
import ActionConstants from "../config/AppConstants";
const innitialData = {
  templatesListData: {},
};
export default function template(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_ALL_TEMPLATES: {
      return {
        ...state,
        templatesListData: action.data,
      };
    }
    default:
      return { ...state };
  }
}
