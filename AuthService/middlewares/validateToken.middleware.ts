import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ACCESS_DENIED, JWT_SECRET_KEY } from "../constants";
import { authCodeManager } from "../services/authCodeManager";

export const validateToken = function (req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies["token"]

    try {
        if (token !== undefined) {
            // If not valid token, throw err
            const payload: any = verify(token, JWT_SECRET_KEY)

            // next()
            // Must redirect to the 
            const userId: string = payload["id"]
            
            const appCallbackUrl = req.query["appCallbackUrl"]
            const serviceCallbackUrl = req.query["serviceCallbackUrl"]
            const authCode = authCodeManager.generateCode(userId)

            res.redirect(301, `${serviceCallbackUrl}?appCallbackUrl=${appCallbackUrl}&code=${authCode}`)
            return
        }
        next()
    } catch (err: any) {
        res.status(ACCESS_DENIED).json({ msg: err.message })
    }
}

