import { shortKey } from "../utils/utils"
import { httpCommon } from "./httpCommon"

export const fileService = {

    upload: async function (formData) {
        return { data: mockUploadFileResults }
    }
}

const mockUploadFileResults = [...Array(10).keys()].map(key => {
    return {
        id: shortKey(),
        message: ""
    }
})
