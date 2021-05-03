import { serviceCall } from "../ServiceCall";


export const sendTextMessage = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCall({
      url: "/api/SMS/SendSMS",
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


