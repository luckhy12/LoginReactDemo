import { serviceCall } from "../ServiceCall";


export const sendTextMessage = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCall({
      url: "/api/TextSMS/SendTextSMS",
      method: "post",
      data: data,
    })
      .then((response) => {
        if (response && response.data) {
          callback && callback(response);
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response);
      });
  };
};

export const sendEmail = (data, callback, errorCallBack) => {
    return async (dispatch) => {
        serviceCall({
        url: "/api/Email/SendEmail",
        method: "post",
        data: data,
      })
        .then((response) => {
          if (response && response.data) {
            callback && callback(response);
          }
        })
        .catch((error) => {
          errorCallBack && errorCallBack(error.response.data);
        });
    };
  };

  export const makeVoiceCall = (data, callback, errorCallBack) => {
    return async (dispatch) => {
        serviceCall({
        url: "/api/VoiceCall/MakeVoiceCall",
        method: "post",
        data: data,
      })
        .then((response) => {
          if (response && response.data) {
            callback && callback(response);
          }
        })
        .catch((error) => {
          errorCallBack && errorCallBack(error.response);
        });
    };
  };


