const router = require("express").Router();  
var express = require('express');
const path = require('path'); // joins the specified paths into one
const Image = require('../models/Image.js');



const images = [{
    fieldname: 'image',
    originalname: 'KeaTube.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'C:\\Users\\Niunia Wilczek\\Kea_DAT_Node_2020_Spring\\Exam_Project/uploads/',
    path: 'C:\\Users\\Niunia Wilczek\\Kea_DAT_Node_2020_Spring\\Exam_Project\\uploads\\1591029406983KeaTube.png',
    size: 38984

},
{
  fieldname: 'image',
  originalname: 'cat.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'C:\\Users\\Niunia Wilczek\\Kea_DAT_Node_2020_Spring\\Exam_Project/uploads/',
  filename: '1591042321552cat.jpeg',
  path: 'C:\\Users\\Niunia Wilczek\\Kea_DAT_Node_2020_Spring\\Exam_Project\\uploads\\1591042321552cat.jpeg',
  size: 41981
}];

//router.use('/images', express.static(path.join(__dirname + '/uploads')));
// router.get("/images", (req, res) => {


 // return res.send({response: images});
//});

router.get("/images", function(req, res) {
  let response = {};

  db.Image.query().select()
  .then(images => {
      response.status = 200;
      response.images = images;

      res.send(response);
  }).catch(err => {
      response.status = 500;
      response.errorMessage = "Error querying the database.";

      res.send(response);
  });

});

  module.exports = router;