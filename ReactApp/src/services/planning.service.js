import httpCommon from "./httpCommon";

const path = '/plannings'

const planningService = {
    getById: async (id) => {
        return httpCommon.get(`${path}/${id}`)
    },
    getByQuery: async () => {
        return httpCommon.get(`${path}/query`)
    },
    addNew: async data => {
        return httpCommon.post(path, data)
    },
    update: async (id, data) => {
        return httpCommon.put(`${path}/${id}`, data)
    },
    remove: async (id) => {
        return httpCommon.delete(`${path}/${id}`)
    }
}

export default planningService