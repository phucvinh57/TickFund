import { Request, Response } from "express";
import LoginDto from "../dtos/login.dto";

export const AuthController = {
    login: function (req: Request, res: Response) {
        const loginDto: LoginDto = req.body.loginDto
        console.log(loginDto)
        res.redirect(200, "/home")
    }
}