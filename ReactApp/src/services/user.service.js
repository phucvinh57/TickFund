import { tfServiceHTTPCommon } from "./httpCommon"

export const userService = {
    getAllUserInfoWithRole: async function () {
        return tfServiceHTTPCommon.get("/users")
    },
    getUserById: async function (userId) {
        return tfServiceHTTPCommon.get(`/users/${userId}`)
    },
    changeRole: async function (userId, roleId) {
        return tfServiceHTTPCommon.put(`/users/role`, { userId, roleId })
    },
    changeDepartment: async function (userId, departmentId) {
        return tfServiceHTTPCommon.put(`/users/department`, { userId, departmentId })
    }
}