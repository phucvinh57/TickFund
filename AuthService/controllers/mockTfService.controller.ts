import { Request, Response } from "express"
import axios, { AxiosResponse } from "axios"

// Use only for testing
export const MockTFServiceController = {
    getAuthentication: async function (req: Request, res: Response) {
        const authCode = res.locals["code"]
        const appCallbackUrl = res.locals["appCallbackUrl"]

        const response: AxiosResponse = await axios.get(`http://localhost:8082/auth/check?code=${parseInt(authCode)}`)

        // Create new jwt and save to cookie
        res.redirect(appCallbackUrl)
    }
}