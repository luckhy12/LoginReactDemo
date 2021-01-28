import axios from 'axios';
const API_URL = 'https://staging-api.dialsight.com';

export function serviceCall(requestData) {

    return new Promise((resolve, reject) => {
        let url = API_URL + requestData.url;
        const request = {
            method: requestData.method || 'GET',
            headers: requestData.headers || {},
            data: requestData.data || {},
            url: url
        }
        axios(request)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}
