import { tfServiceHTTPCommon } from "./httpCommon"

export const roleService = {
    getRoles: async function () {
        return tfServiceHTTPCommon.get("/roles")
    },
    getPermission: async function () {
        return tfServiceHTTPCommon.get("/roles/permissions")
    },
    getResourceActionMapping: async function () {
        return tfServiceHTTPCommon.get("/roles/mapping")
    },
    updatePermissions: async function (data) {
        return tfServiceHTTPCommon.put("/roles/permissions", data)
    },
    createRole: async function (roleName) {
        return tfServiceHTTPCommon.post("/roles", { roleName })
    }
}