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
            const userEmail: string = payload["email"]
            const serviceCallbackUrl = req.query["serviceCallbackUrl"]
            if (serviceCallbackUrl) {
                const appCallbackUrl = req.query["appCallbackUrl"]
                const authCode = authCodeManager.generateCode(userId)
                res.redirect(301, `${serviceCallbackUrl}?appCallbackUrl=${appCallbackUrl}&code=${authCode}`)
            } else {
                res.locals["userId"] = userId
                res.locals["userEmail"] = userEmail
                next()
            }
            return
        }
        // if not token
        if (["/index.html", "/"].includes(req.path))
            next()
        else res.status(ACCESS_DENIED).json({ msg: "Access Denied !" })
    } catch (err: any) {
        res.status(ACCESS_DENIED).json({ msg: "Token invalid or has been expired !" })
    }
}

