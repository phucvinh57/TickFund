import express, { Express } from "express";
import cors from "cors";
import { connectToDb } from "./database";
import { validateToken } from "./middlewares/validateToken.middleware";
import router from "./routes";

const PORT = 8082;
const app: Express = express();

connectToDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/", router);

app.use(validateToken)
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})