import { tfServiceHTTPCommon } from "./httpCommon"

export const roleService = {
    getRoles: async function() {
        return tfServiceHTTPCommon.get("/roles")
    },
    getPermission: async function () {
        return tfServiceHTTPCommon.get("/roles/permissions")
    },
    getResourceActionMapping: async function() {
        return tfServiceHTTPCommon.get("/roles/mapping")
    },
    updatePermissions: async function(data) {
        console.log(data)
        return tfServiceHTTPCommon.put("/roles/permissions", data)
    }
}