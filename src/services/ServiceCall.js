import axios from "axios";
const API_URL = "https://staging-api.dialsight.com";

export function serviceCallAuth(requestData) {
  return new Promise((resolve, reject) => {
    let url = API_URL + requestData.url;
    const request = {
      method: requestData.method || "GET",
      headers: {
        Authorization: "Bearer  " + localStorage.token,
        "Content-Type": "application/json-patch+json",
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    };
    if (requestData.method === "get") {
      request["params"] = requestData.data || {};
    } else {
      request["data"] = requestData.data || {};
    }
    axios(request)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function serviceCall(requestData) {
  return new Promise((resolve, reject) => {
    let url = API_URL + requestData.url;
    const request = {
      method: requestData.method || "GET",
      headers: requestData.headers || {},
      data: requestData.data || {},
      url: url,
    };
    axios(request)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
