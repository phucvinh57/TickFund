import { shortKey } from "../utils/utils"
import { fileServiceHTTPCommon } from "./httpCommon"

export const fileService = {
    uploadToTfService: async function (formData) {
        return { data: mockUploadFileResults }
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
