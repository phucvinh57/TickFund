import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "./constants";
import UserDto from "./user.dto";

export default function validateInput(req: Request, res: Response, next: NextFunction) {
    try {
        req.body.loginDto = new UserDto(req.body.email, req.body.password)
        next()
    } catch (err: any) {
        res.status(BAD_REQUEST).json({ msg: err.message })
    }
}