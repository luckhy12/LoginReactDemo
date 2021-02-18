import { serviceCallAuth } from "../ServiceCall";
import AppConstants from "../../config/AppConstants";

export const createClient = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Client/PostPutClient",
      method: "post",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        callback && callback(response && response.data);
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const getAllClientsList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Client/GetClient",
      method: "get",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data.tblClient);
          Array.isArray(response.data.tblClient) &&
            response.data.tblClient.forEach((element, index) => {
              response.data.tblClient[index]["id"] = index + 1;
            });
          dispatch({
            data: response.data.tblClient,
            type: AppConstants.GET_ALL_CLIENTS,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const updateClient = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Role/" + data.id + "?id=" + data.id,
      method: "put",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response) {
          callback && callback(response.data);
        }
      })
      .catch((error) => {
        errorCallBack &&
          errorCallBack(error && error.response && error.response.data);
      });
  };
};

export const deleteClient = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url:
        "/api/Client/DeleteClient" +
        "?Calling_UserID_chr=" +
        data.calling_UserID_chr +
        "&ClientID_lng=" +
        data.clientID_ids +
        "&is_Hard_Delete_ysn=false&Include_Deleted_Clients_byt=0",
      method: "delete",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response) {
          callback && callback(response.data);
        }
      })
      .catch((error) => {
        errorCallBack &&
          errorCallBack(error && error.response && error.response.data);
      });
  };
};
