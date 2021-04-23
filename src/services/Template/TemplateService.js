import { serviceCallAuth } from "../ServiceCall";
import AppConstants from "../../config/AppConstants";

export const addEditTemplate = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Email/AddEditTemplate",
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

export const getAllTemplatesList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Email/GetTemplate",
      method: "get",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data.tblTemplate);
          Array.isArray(response.data.tblTemplate) &&
            response.data.tblTemplate.forEach((element, index) => {
              response.data.tblTemplate[index]["id"] = index + 1;
            });
          dispatch({
            data: response.data.tblTemplate,
            type: AppConstants.GET_ALL_TEMPLATES,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const deleteTemplate = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url:
        "/api/Email/DeleteTemplate" +
        "?Calling_UserID_chr=" +
        data.calling_UserID_chr +
        "&TemplateID_lng=" +
        data.templateID_ids +
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
