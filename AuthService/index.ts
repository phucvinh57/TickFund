import express, { Express } from "express";
import router from "./routes/auth.route";

const PORT = 8082;
const app: Express = express();

app.use(express.json())
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})