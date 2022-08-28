import { httpCommon } from "./httpCommon"

const authService = {
    checkIfLoggedIn: async function (appCallbackUrl) {
        return httpCommon.get(`/auth/login?appCallbackUrl=${appCallbackUrl}`)
    }
}

export default authService