// import { get } from "lodash";
import ActionConstants from "../config/AppConstants";
const innitialData = {
  smsLogsDataList: [],
};

export default function messageLogs(state = innitialData, action) {
  switch (action.type) {
    case ActionConstants.GET_ALL_SMS_LOG: {
      return {
        ...state,
        smsLogsDataList: action.data,
      };
    }
    default:
      return { ...state };
  }
}

