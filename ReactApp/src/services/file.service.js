import { shortKey } from "../utils"
import { fileServiceHTTPCommon, tfServiceHTTPCommon } from "./httpCommon"

export const fileService = {
    uploadToTfService: async function (formData) {
        return tfServiceHTTPCommon.post('/attachments/upload', formData)
    },
    uploadToPublic: async function(formData) {
        return fileServiceHTTPCommon.post("/public/upload", formData)
    }
}

const mockUploadFileResults = [...Array(10).keys()].map(key => {
    return {
        id: shortKey(),
        message: ""
    }
})
