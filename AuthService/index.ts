import express, { Express } from "express";
import { connectToDb } from "./database";
import router from "./routes";

const PORT = 8082;
const app: Express = express();

connectToDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})