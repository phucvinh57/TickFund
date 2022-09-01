const express = require("express")
const fileUpload = require("express-fileupload")
const router = express.Router()
const path = require("path")
const mimetype = require("mime-types")

const { v4: uuidV4 } = require("uuid")
const { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } = require("../constanst/errorCode")
const PORT = require("../constanst/port")

const PUBLIC_FOLDER_PATH = path.resolve(__dirname, "..") + "/public"

router.use("/", express.static(PUBLIC_FOLDER_PATH))

router.use(fileUpload())
router.post("/upload", function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(BAD_REQUEST_CODE).send({ msg: 'No files were uploaded.' });
    }

    const avatarImage = req.files.avatar;
    const extension = mimetype.extension(avatarImage.mimetype)
    const filename = uuidV4().replaceAll("-", "") + "." + extension

    avatarImage.mv(PUBLIC_FOLDER_PATH + "/" + filename, function (err) {
        if (err) return res.status(INTERNAL_SERVER_ERROR_CODE).json({ msg: err.message });
        res.json({ path: req.protocol + `://` + req.hostname + ":" + PORT.toString()+ "/public/" + filename });
    });
})

module.exports = router