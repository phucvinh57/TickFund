import { tfServiceHTTPCommon } from "./httpCommon"

export const roleService = {
    getPermission: async function () {
        return tfServiceHTTPCommon.get("/roles")
    },
    getResourceActionMapping: async function() {
        return tfServiceHTTPCommon.get("/roles/mapping")
    }
}