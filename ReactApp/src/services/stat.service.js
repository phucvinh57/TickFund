import { tfServiceHTTPCommon } from "./httpCommon"
import { dateToStringYYYYmmDD } from "../utils"

const statService = {
    getStat: async function (start, end, period) {

        const queryParam = `start=${dateToStringYYYYmmDD(start)}&end=${dateToStringYYYYmmDD(end)}&period_type=${period}`
        tfServiceHTTPCommon.options('/')
            .then(response => {
                console.log(response)
            })
        return tfServiceHTTPCommon.get(`/stat?${queryParam}`)
    }
}

export default statService