import { tfServiceHTTPCommon } from './httpCommon'

const path = '/categories'

const categoriesService = {
    getAll: async () => {
        return tfServiceHTTPCommon.get(path)
    },
    addNew: async data => {
        return tfServiceHTTPCommon.post(path, data)
    },
    // update: async (name, data) => {
    //     return tfServiceHTTPCommon.put(`${path}/${name}`, data)
    // },
    remove: async (name) => {
        return tfServiceHTTPCommon.delete(`${path}/${name}`)
    }
}

export default categoriesService