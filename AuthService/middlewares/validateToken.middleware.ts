import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ACCESS_DENIED, JWT_SECRET_KEY } from "../constants";
import { authCodeManager } from "../services/authCodeManager";

export const validateToken = function (req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies["token"]

    try {
        if (token) {
            // If not valid token, throw err
            const payload: any = verify(token, JWT_SECRET_KEY)
            const userId: string = payload["id"]
            const serviceCallbackUrl = req.query["serviceCallbackUrl"]
            if(serviceCallbackUrl) {
                const appCallbackUrl = req.query["appCallbackUrl"]
                const authCode = authCodeManager.generateCode(userId)
                res.redirect(301, `${serviceCallbackUrl}?appCallbackUrl=${appCallbackUrl}&code=${authCode}`)
                return
            }
            next()
            return
        }
        // if not token
        else if(!["/index.html", "/"].includes(req.path)) {
            res.redirect("/")
            return
        }
        next()
    } catch (err: any) {
        res.status(ACCESS_DENIED).json({ msg: err.message })
    }
}

