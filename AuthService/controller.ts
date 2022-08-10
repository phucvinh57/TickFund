import { Request, Response } from "express";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { dbQuery } from "./database";
import UserDto from "./user.dto";
import { FieldPacket, RowDataPacket } from "mysql2";
import { ACCESS_DENIED } from "./constants";
import { compare } from "bcrypt"

config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const MONTH = 1000 * 3600 * 24 * 30

if (!JWT_SECRET_KEY) {
    console.log("Must provide jwt private key")
    process.exit(0)
}

export const AuthController = {
    login: async function (req: Request, res: Response) {
        const loginDto: UserDto = req.body.loginDto

        const [queryResult]: [RowDataPacket[], FieldPacket[]] = await dbQuery(
            `SELECT email, password FROM account WHERE email = ?`,
            [loginDto.email]
        )

        if (queryResult.length === 0) {
            res.status(ACCESS_DENIED).json({ msg: "Incorrect email or password" })
            return
        }

        const userData: UserDto = new UserDto(queryResult[0].email, queryResult[0].password)
        const checkPassword = await compare(loginDto.password, userData.password)
        if(checkPassword === false) {
            res.status(ACCESS_DENIED).json({ msg: "Incorrect email or password" })
            return
        }
        
        const jwt: string = sign(
            { email: loginDto.email },
            JWT_SECRET_KEY,
            {
                algorithm: "HS256",
                expiresIn: MONTH
            })
        res.send({
            jwt,
            email: userData.email
        })
    }
}