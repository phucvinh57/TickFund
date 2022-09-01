import { Express } from "express";
import authRouter from "./auth.route";
import staticRouter from "./static.route"
import userRouter from "./user.route"

export default function route(app: Express) {
    app.use("/auth", authRouter)
    app.use("/", staticRouter)
    app.use("/user", userRouter)
}