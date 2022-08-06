import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "../constants";
import LoginDto from "../dtos/login.dto";

export default function validateInput(req: Request, res: Response, next: NextFunction) {
    try {
        req.body.loginDto = new LoginDto(req.body.email, req.body.password)
        next()
    } catch (err: any) {
        res.status(BAD_REQUEST).json({ msg: err.message })
    }
}