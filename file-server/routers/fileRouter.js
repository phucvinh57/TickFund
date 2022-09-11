const { default: axios } = require('axios');
var express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path');
const mimetype = require("mime-types")

var router = express.Router();
const url = require('url');

const ROOT_PATH = 'media'
const HOST = process.env.MY_DOMAIN

function buildStaticFileServe(parentDirName) {
    router.use(fileUpload({
        createParentPath: true
    }));

    router.post('/upload', async (req, res) => {
        try {
            if(!req.files) {
                res.send({
                    error: false,
                    message: 'No file uploaded'
                });
            } 
            else if(req.body.prefix_id == null || req.body.app_name == null){
                res.send({
                    error: "Missing field"
                })
            }
            else {
                let payload = req.files.file;
                let prefixId = req.body.prefix_id
                let appName = req.body.app_name
                const extension = mimetype.extension(payload.mimetype)
                payload.mv( [parentDirName, ROOT_PATH, appName, ''].join('/') + [prefixId, extension].join('.'));
    
                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    url: ['http:/', HOST, ROOT_PATH, appName,  [prefixId, extension].join('/')].join('/')
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/*', async (req, res, next) => {
        try {
            const urlParts = url.parse(req.url);
            console.log(req.url)
    
            const response = await axios.get(req.query.code_callback)
            if(response.status == 200 && response.data.message == true){
                sendFiled(res, urlParts.pathname, req.query.originalName)
            }
            else if(response.status == 200 && data.message == false){
                res.send({
                    error: "File status is not valid or expired"
                })
            }
            else{
                res.status(500).end({
                    error: "Some thing went wrong in server"
                })
            }
        }
        catch(err){
            console.log(err)
        }
    })

    function sendFiled(res, fileName, originalName){
        var absolutePath = ROOT_PATH + fileName
        var options = {
            root: path.join(parentDirName)
        };
        console.log(absolutePath)
    
        res.download(absolutePath, originalName, options, function (err) {
            if (err) {
                console.log(err)
            }
        });
    }
    return router
}


module.exports = {buildStaticFileServe}