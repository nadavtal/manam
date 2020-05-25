var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const config = require('../config.js')
const fs = require("fs");
const upload = require("../middlewares/upload");
const uploadController = require("../controllers/upload");

console.log('upload', upload)


app.post("/uploads", upload.single("profileImg"), uploadController.uploadFiles);
app.post("/profile_images", upload.single("profileImg"), uploadController.uploadFiles);
app.post("/profile_images/:type/:id", upload.single("profileImg"), uploadController.uploadFiles);
app.put("/profile_images/:type/:id", upload.single("profileImg"), uploadController.updateFiles);
app.get("/profile_images/:type/:id", function(req, res){
    console.log('getting profile image by provider: '+ req.params.id);
    var q = `SELECT * FROM tbl_profile_images where ${req.params.type}_id = ${req.params.id};`;
    connection.query(q, function (error, results) {
    if (error) res.send(error);
    console.log(results)
    if(results[0] && results[0].data) {
        const buf = Buffer.from(results[0].data);
        // const buf = Buffer.from(results[0].data, "binary").toString('base64');
        fs.writeFileSync("./resources/static/assets/tmp/" + results[0].name , buf);

    }
    res.send(results);
    });
  });