import { shortKey } from "../utils/utils"
import { httpCommon } from "./httpCommon"

export const fileService = {
    uploadToTfService: async function (formData) {
        return { data: mockUploadFileResults }
    },
    uploadToPublic: async function(formData) {
        return
    }
}

const mockUploadFileResults = [...Array(10).keys()].map(key => {
    return {
        id: shortKey(),
        message: ""
    }
})
