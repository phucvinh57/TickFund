const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');

const PUBLIC_STATIC_FOLDER = "./public"
if (!fs.existsSync(PUBLIC_STATIC_FOLDER)) {
    fs.mkdirSync(PUBLIC_STATIC_FOLDER);
}

const app = express();
const fileRouter = require('./routers/fileRouter')
const publicRouter = require("./routers/public.route");

const { PORT, SERVICE_DOMAIN_WHITELIST } = require("./constants")

app.use(cors({ origin: SERVICE_DOMAIN_WHITELIST }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/media', fileRouter.buildStaticFileServe(__dirname));
app.use('/public', publicRouter)

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});