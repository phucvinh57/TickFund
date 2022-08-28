import axios from "axios"
export const httpCommon = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
})