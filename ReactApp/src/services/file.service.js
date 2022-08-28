import axios from "axios"

const httpCommon = axios.create({
    baseURL: "http://localhost:8081"
})

export const fileService = {
    upload: async function (formData) {
        console.log(formData)
    }
}