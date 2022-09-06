import httpCommon from "./httpCommon"
import { dateToString } from "../utils/utils"

const statService = {
    getStat: async function (start, end, period) {
        const queryParam = `start=${dateToString(start)}&end=${dateToString(end)}&period_type=${period}`
        httpCommon.options('/')
        .then(response => {
            console.log(response)
        })
        return httpCommon.get(`/stat?${queryParam}`)
    }
}

export default statService