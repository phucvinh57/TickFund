import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import UserDto from "../user.dto";
import { ACCESS_DENIED, BAD_REQUEST, JWT_SECRET_KEY } from "../constants";
import { validateUser } from "../services/validateUser";
import { authCodeManager } from "../services/authCodeManager";

const MONTH = 1000 * 3600 * 24 * 30

export const AuthController = {
    login: async function (req: Request, res: Response) {
        let loginDto: UserDto

        try {
            loginDto = new UserDto(req.body.email, req.body.password)
        } catch (err) {
            res.status(BAD_REQUEST).json({ msg: "Incorrect request body" })
            return
        }

        const userId: string | null = await validateUser(loginDto)
        if (userId === null) {
            res.status(ACCESS_DENIED).json({ msg: "Email or password incorrect !" })
            return
        }

        const jwt: string = sign({ id: userId }, JWT_SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: MONTH
        })

        res.cookie("token", jwt)

        const appCallbackUrl = req.query["appCallbackUrl"]?.toString()
        const serviceCallbackUrl = req.query["serviceCallbackUrl"]?.toString()

        const authCode = authCodeManager.generateCode(userId)

        res.redirect(301, `${serviceCallbackUrl}?appCallbackUrl=${appCallbackUrl}&code=${authCode}`)
    },

    checkCode: async function (req: Request, res: Response) {
        const code = res.locals["code"];

        const userId = authCodeManager.validateCode(parseInt(code))
        if (userId === undefined) {
            res.status(ACCESS_DENIED).json({ msg: "Code is invalid or has been expired !" })
            return
        }

        res.json({ userId })
    }
}