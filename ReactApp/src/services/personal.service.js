import { ssoServiceHTTPCommon, tfServiceHTTPCommon } from "./httpCommon"

export const personalService = {
    getInfoAndRole: async function () {
        return tfServiceHTTPCommon.get("/personal")
    },
    updateAvatar: async function (avatarUrl) {
        return ssoServiceHTTPCommon.put("/personal/avatar", { avatarUrl })
    },
    changePassword: async function (oldPass, newPass, confirmedNewPass) {
        return ssoServiceHTTPCommon.put("/personal/password", {
            oldPass, newPass, confirmedNewPass
        })
    },
    updateInfo: async function(data) {
        return ssoServiceHTTPCommon.put("/personal/info", data)
    }
}