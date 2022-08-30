import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "../constants";

export const checkRequiredRequestQueries = (queryNames: string[]) =>
    function (req: Request, res: Response, next: NextFunction) {
        for (let queryName of queryNames) {
            const queryValue = req.query[queryName]?.toString()
            if (typeof queryValue === "undefined") {
                res.status(BAD_REQUEST).json({ msg: "Missing query variables !" })
                return
            }
            res.locals[queryName] = queryValue
        }
        next()
    }

