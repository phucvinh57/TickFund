import { Express } from "express";
import TransactionRouter from "./transactions";

function route(app: Express) {
    app.use('/transactions', TransactionRouter)
}

export default route;