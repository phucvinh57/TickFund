import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { LoginDto } from "../dtos";
import { ACCESS_DENIED, BAD_REQUEST, JWT_SECRET_KEY } from "../constants";
import { validateUser, authCodeManager } from "../services";

const MONTH = 1000 * 3600 * 24 * 30

export const AuthController = {
    login: async function (req: Request, res: Response) {
        let loginDto: LoginDto

        try {
            loginDto = new LoginDto(req.body.email, req.body.password)
        } catch (err) {
            res.status(BAD_REQUEST).json({ msg: "Incorrect request body" })
            return
        }

        const userId: string | null = await validateUser(loginDto)
        if (userId === null) {
            res.status(ACCESS_DENIED).json({ msg: "Email or password incorrect !" })
            return
        }

        const jwt: string = sign({ id: userId, email: loginDto.email }, JWT_SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: MONTH
        })

        res.cookie("token", jwt)
        const serviceCallbackUrl = req.query["serviceCallbackUrl"]?.toString()
        if (serviceCallbackUrl) {
            const appCallbackUrl = req.query["appCallbackUrl"]?.toString()

            const authCode = authCodeManager.generateCode(userId)
            res.redirect(301, `${serviceCallbackUrl}?appCallbackUrl=${appCallbackUrl}&code=${authCode}`)
        } else {
            res.redirect("/success")
        }
    },

    checkCode: async function (req: Request, res: Response) {
        const code = res.locals["code"];

        const userId = authCodeManager.validateCode(parseInt(code))
        if (userId === undefined) {
            res.json({
                code_check: false,
                message: "Code is invalid or has been expired !"
            })
            return
        }

        res.json({
            user_id: userId,
            code_check: true
        })
    }
}