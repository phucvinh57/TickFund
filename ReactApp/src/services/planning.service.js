import { tfServiceHTTPCommon } from "./httpCommon";

const path = '/plannings'

const planningService = {
    getById: async (id) => {
        return tfServiceHTTPCommon.get(`${path}/${id}`)
    },
    getByQuery: async () => {
        return tfServiceHTTPCommon.get(`${path}/query`)
    },
    addNew: async data => {
        return tfServiceHTTPCommon.post(path, data)
    },
    update: async (id, data) => {
        return tfServiceHTTPCommon.put(`${path}/${id}`, data)
    },
    remove: async (id) => {
        return tfServiceHTTPCommon.delete(`${path}/${id}`)
    }
}

export default planningService