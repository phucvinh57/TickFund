import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { connectToDb } from "./database";
import { validateToken } from "./middlewares/validateToken.middleware";
import router from "./routes";
import nocache from "nocache"

const PORT = 8082;
const app: Express = express();

connectToDb()

app.use(cors())
app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(validateToken)
app.use(express.static("public"))

app.use("/", router);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})