var express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');


var app = express();
var PORT = 6000;
const fileRouter = require('./routers/fileRouter')
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


app.use('/media', fileRouter.buildStaticFileServe(__dirname));
 
app.get('/', function(req, res){
    console.log("File Sent")
    res.send();
});
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});