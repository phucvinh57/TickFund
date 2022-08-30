import { Request, Response } from "express";
import fs from "fs"
import { ROOT_PATH } from "../constants";

export const staticController = {
    getIndex: function (req: Request, res: Response) {
        fs.readFile(ROOT_PATH + '/public/index.html', 'utf8', (err, text) => {
            res.send(text);
        });
    },
    getLoginSuccess: function (req: Request, res: Response) {
        fs.readFile(ROOT_PATH + '/public/login-success.html', 'utf8', (err, text) => {
            res.send(text);
        });
    }
}