const express = require("express")
const fileUpload = require("express-fileupload")
const router = express.Router()
const path = require("path")
const mimetype = require("mime-types")
const fs = require("fs/promises")
const util = require("util")
const { v4: uuidV4 } = require("uuid")

const { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, PORT } = require("../constants")
const PUBLIC_FOLDER_PATH = path.resolve(__dirname, "..") + "/public"

const mvFilePromise = file => util.promisify(file.mv).bind(file)

router.use("/", express.static(PUBLIC_FOLDER_PATH))

router.delete("/:filename", async function (req, res) {
    const filename = req.params.filename
    try {
        await fs.rm(PUBLIC_FOLDER_PATH + "/" + filename)
        res.send({ msg: "Delete old avatar ok" })
    } catch (error) {
        res.send({ msg: "Avatar file does not exists" })
    }
})

router.use(fileUpload())
router.post("/upload", async function (req, res) {
    if (!req.files) {
        return res.status(BAD_REQUEST_CODE).send({ msg: 'No files were uploaded.' });
    }
    const fileKeys = Object.keys(req.files)
    if (fileKeys.length === 0) {
        return res.status(BAD_REQUEST_CODE).send({ msg: 'No files were uploaded.' });
    }

    const mvJobs = fileKeys.map(key => {
        const file = req.files[key]
        const extension = mimetype.extension(file.mimetype)
        const filename = uuidV4().replaceAll("-", "") + "." + extension

        const path = req.protocol
            + `://` + req.hostname + ":"
            + (req.hostname === "localhost" ? PORT.toString() : "")
            + "/public/" + filename;
        return {
            key: key,
            returnPath: path,
            promise: mvFilePromise(file)(PUBLIC_FOLDER_PATH + "/" + filename)
        }
    })

    try {
        await Promise.allSettled(mvJobs.map(job => job.promise))
        const filePaths = {}
        mvJobs.forEach(job => {
            filePaths[job.key] = job.returnPath
        })
        return res.json(filePaths);
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({ msg: err.message });
    }
})

module.exports = router