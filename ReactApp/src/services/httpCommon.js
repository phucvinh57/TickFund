import axios from "axios"
const httpCommon = axios.create({
    baseURL: process.env.REACT_APP_TFSERVICE_BASE_URL, 
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
})

export default httpCommon