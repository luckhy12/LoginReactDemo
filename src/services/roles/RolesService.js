import { serviceCall, serviceCallAuth } from "../ServiceCall";
import AppConstants from "../../config/AppConstants";

export const createRole = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Role/CreateRole",
      method: "post",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response);
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const getAllRolesList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Role/GetAllRoles",
      method: "get",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data.tblRole);
          dispatch({
            data: response.data.tblRole,
            type: AppConstants.GET_ALL_ROLES,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const updateRole = (data, callback, errorCallBack) => {
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

export const deleteRole = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Role/" + data.id + "?id=" + data.id,
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
