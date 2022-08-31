import httpCommon from './httpCommon'

const path = '/categories'

const categoriesService = {
    getAll: async () => {
        return httpCommon.get(path)
    },
    addNew: async data => {
        return httpCommon.post(path, data)
    },
    update: async (name, data) => {
        return httpCommon.put(`${path}/${name}`, data)
    },
    remove: async (name) => {
        return httpCommon.delete(`${path}/${name}`)
    }
}

export default categoriesService