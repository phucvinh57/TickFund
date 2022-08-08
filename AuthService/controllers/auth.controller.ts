import { Request, Response } from "express";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import LoginDto from "../dtos/login.dto";

config()

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const MONTH = 1000 * 3600 * 24 * 30

if (!JWT_PRIVATE_KEY) {
    console.log("Must provide jwt private key")
    process.exit(0)
}

/** The auth controller has 2 function
 * login: for POST login method
 * renderForm: for GET method, get a login page
 */
export const AuthController = {
    /** The renderForm function must do these following steps:
     *                    no ------------------------------>       
     *                    |                                 | render login form
     * User has a jwt --->                         no ----->
     *                    |                        |
     *                   yes ---> validate jwt --->
     *                                             |
     *                                            yes -----> redirect to @param callbackUrl
     */
    renderForm: function (req: Request, res: Response) {
        const username = 'nik',
            password = 'abc123',
            auth = "Basic " + username + ":" + password;

        res.header('Authorization', auth);
        res.redirect(301, 'http://localhost:8082/home?callbackUrl=https://github.com')
    },

    /** The login function must do these following steps:
     * 1. Check username & password. If false, return 403 code & message
     * 2. Sign a jwt, which has payload contains user email
     * 3. Redirect to data
     */
    login: function (req: Request, res: Response) {
        const loginDto: LoginDto = req.body.loginDto
        console.log(loginDto)
        const jwt: string = sign(
            { email: loginDto.email },
            JWT_PRIVATE_KEY,
            {
                algorithm: "HS256",
                expiresIn: MONTH
            })
        res.send(jwt)
    }
}