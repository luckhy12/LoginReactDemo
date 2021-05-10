import { serviceCallAuth } from "../ServiceCall";
import AppConstants from "../../config/AppConstants";

export const getAllMessageList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/TextSMS/GetSMSLogs",
      method: "post",
      data: data,
    })
      .then((response) => {
        if (response && response.data) {

          callback && callback(response.data);
          Array.isArray(response.data) &&
            response.data.forEach((element, index) => {
              response.data[index]["id"] = index + 1;
            });
          dispatch({
            
            data: response.data,
            type: AppConstants.GET_ALL_SMS_LOG,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const getVoiceCallLogsList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/VoiceCall/GetVoiceCallLogs",
      method: "post",
      data: data,
    })
      .then((response) => {
        if (response && response.data) {

          callback && callback(response.data);
          Array.isArray(response.data) &&
            response.data.forEach((element, index) => {
              response.data[index]["id"] = index + 1;
            });
          dispatch({
            
            data: response.data,
            type: AppConstants.GET_VOICE_CALL_LOG,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

