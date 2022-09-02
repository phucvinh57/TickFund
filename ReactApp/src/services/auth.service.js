import { tfServiceHTTPCommon } from "./httpCommon"

const authService = {
    checkIfLoggedIn: async function (appCallbackUrl) {
        return tfServiceHTTPCommon.get(`/auth/login?appCallbackUrl=${appCallbackUrl}`)
    }
}

export default authService