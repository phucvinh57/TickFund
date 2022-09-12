import { tfServiceHTTPCommon } from "./httpCommon";

const path = '/plannings'

const planningService = {
    getPlanningByQuery: (query) => {
        return tfServiceHTTPCommon.post(`${path}/query`, query)
    },
    getById: async (planningId) => {
        return tfServiceHTTPCommon.get(path + "/" + planningId)
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