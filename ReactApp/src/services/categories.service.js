import http from './httpCommon'

const path = '/categories'

const getAll = async () => {
    let response = await http.get(path)
    return response
}

const addNew = async data => {
    let response = await http.post(path, data)
    return response
}

const update = async (name, data) => {
    return http.put(`${path}/${name}`)
}

const remove = async (name) => {
    let response = await http.delete(`${path}/${name}`)
    return response
}

const categoriesService = {
    getAll,
    addNew,
    update,
    remove
}

export default categoriesService