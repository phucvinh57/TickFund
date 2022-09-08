import {tfServiceHTTPCommon} from "./httpCommon"
import { dateToString } from "../utils/utils"

const statService = {
    getStat: async function (start, end, period) {
        const queryParam = `start=${dateToString(start)}&end=${dateToString(end)}&period_type=${period}`
        tfServiceHTTPCommon.options('/')
        .then(response => {
            console.log(response)
        })
        return tfServiceHTTPCommon.get(`/stat?${queryParam}`)
    }
}

export default statService