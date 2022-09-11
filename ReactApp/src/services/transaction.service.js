import { EMPTY_AVATAR } from "../resource";
import { shortKey } from "../utils";
import { tfServiceHTTPCommon } from "./httpCommon";
const path = '/transactions/'

export const transactionService = {
    getTransactions: function (query) {
        return tfServiceHTTPCommon.post('/transactions/query', query)

    },
    addTransactions: function (data) {
        return tfServiceHTTPCommon.post(path, data)
    }
}