import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ACCESS_DENIED, BAD_REQUEST, JWT_SECRET_KEY } from "../constants";

export const validateToken = function (req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.token
    try {
        if (token) {
            // If not valid token, throw err
            verify(token, JWT_SECRET_KEY)

            // Must redirect to the serviceCallbackUrl
            
        } else {
            next()
        }
    } catch (err: any) {
        res.status(ACCESS_DENIED).json({ msg: err.message })
    }
}

