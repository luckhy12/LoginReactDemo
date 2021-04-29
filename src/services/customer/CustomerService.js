import { serviceCallAuth } from "../ServiceCall";
import AppConstants from "../../config/AppConstants";

export const getCustomersList = (data, callback, errorCallBack) => {
  return async (dispatch) => {
    serviceCallAuth({
      url: "/api/Customer/GetCustomer",
      method: "get",
      data: data,
    })
      .then((response) => {
        // dispatch(toggleLoader(false));
        if (response && response.data) {
          callback && callback(response.data.tblCustomer);
          Array.isArray(response.data.tblCustomer) &&
            response.data.tblCustomer.forEach((element, index) => {
              response.data.tblCustomer[index]["id"] = index + 1;
            });
          dispatch({
            data: response.data.tblCustomer,
            type: AppConstants.GET_ALL_CUSTOMERS,
          });
        }
      })
      .catch((error) => {
        errorCallBack && errorCallBack(error.response.data);
      });
  };
};