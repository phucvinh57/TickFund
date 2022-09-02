import axios from "axios"
export const tfServiceHTTPCommon = axios.create({
    baseURL: process.env.REACT_APP_TFSERVICE_BASE_URL, 
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
})

export const ssoServiceHTTPCommon = axios.create({
    baseURL: process.env.REACT_APP_SSOSERVICE_BASE_URL, 
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
})

export const fileServiceHTTPCommon = axios.create({
    baseURL: process.env.REACT_APP_FILESERVICE_BASE_URL, 
    headers: {
        "Content-type": "application/json"
    }
})