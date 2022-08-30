import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { connectToDb } from "./database";
import route from "./routes";
import nocache from "nocache";

const PORT = 8082;
const app: Express = express();

connectToDb()

app.use(cors())
app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))

route(app)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})