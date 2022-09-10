const { default: axios } = require('axios');
var express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path');

var router = express.Router();
const url = require('url');

const ROOT_PATH = 'media'
const HOST = 'localhost:6000'

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
                payload.mv( [parentDirName, ROOT_PATH, ''].join('/') + [ appName, prefixId, payload.name].join('-'));
    
                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    url: ['http:/', HOST, ROOT_PATH,  [ appName, prefixId, payload.name].join('-') ].join('/')
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/*', async (req, res, next) => {
        const urlParts = url.parse(req.url);

        const response = await axios.get(req.query.code_callback)
        if(response.status == 200 && response.data.message == true){
            sendFiled(res, urlParts.pathname)
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

    })

    function sendFiled(res, fileName){
        var absolutePath = ROOT_PATH + fileName
        var options = {
            root: path.join(parentDirName)
        };
    
        res.sendFile(absolutePath, options, function (err) {
            if (err) {
                console.log(err)
            }
        });
    }




    return router
}


module.exports = {buildStaticFileServe}