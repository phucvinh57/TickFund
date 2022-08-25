import axios from "axios"

const httpCommon = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
})

const authService = {
    checkIfLoggedIn: async function () {
        return httpCommon.get("/auth/login")
    }
}

export default authService