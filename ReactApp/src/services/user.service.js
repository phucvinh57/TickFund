import { tfServiceHTTPCommon } from "./httpCommon"

export const userService = {
    getAllUserInfoWithRole: async function () {
        return tfServiceHTTPCommon.get("/users")
    },
    getUserById: async function(userId) {
        return tfServiceHTTPCommon.get(`/users/${userId}`)
    }
}