import { Express } from "express";
import { validateToken } from "../middlewares/validateToken.middleware";
import authRouter from "./auth.route";
import staticRouter from "./static.route"

export default function route(app: Express) {
    app.use("/auth", authRouter)
    
    app.use("/", validateToken)
    app.use("/", staticRouter)
}