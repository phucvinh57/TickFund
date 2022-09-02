import { Express } from "express";
import authRouter from "./auth.route";
import staticRouter from "./static.route"
import personalRouter from "./personal.route"

export default function route(app: Express) {
    app.use("/auth", authRouter)
    app.use("/", staticRouter)
    app.use("/personal", personalRouter)
}