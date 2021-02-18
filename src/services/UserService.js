import { serviceCall, serviceCallAuth } from "../services/ServiceCall";
import ActionConstants from "../config/AppConstants";
export const checkLogin = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCall({
      url: "/api/Account/Login",
      method: "post",
      data: data,
      headers: {
        // Authorization: "",
        "Content-Type": "application/json-patch+json",
      },
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data);
          dispatch({
            data: response.data,
            type: ActionConstants.SAVE_LOGIN_DATA,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const registerUser = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/User/AddUser",
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

export const forgotPassword = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCall({
      url: "/api/Account/ForgotPassword",
      method: "post",
      data: data,
      headers: {
        // Authorization: "",
        "Content-Type": "application/json-patch+json",
      },
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const getUserList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/User/GetAllUsers",
      method: "get",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data.tblUser);
          dispatch({
            data: response.data.tblUser,
            type: ActionConstants.GET_USERS_LIST,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};

export const getRoles = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Role",
      method: "get",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data);
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error && error.response && error.response.data);
      });
  };
};

export const logout = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    dispatch({
      type: ActionConstants.UNAUTH_USER,
    });
  };
};

export const updateUser = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/User/UpdateUser?id="+data.id,
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
        errorCallBack && errorCallBack(error && error.response && error.response.data);
      });
  };
};

export const deleteUser = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/User/DeleteUser?id="+data.id,
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
        errorCallBack && errorCallBack(error && error.response && error.response.data);
      });
  };
};

export const changePassword = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Account/ChangePassword",
      method: "post",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response) {
          callback && callback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error && error.response && error.response.data);
      });
  };
};