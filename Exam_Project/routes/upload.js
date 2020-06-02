const router = require("express").Router();

const fs = require("fs");

const Image = require('../models/Image.js');


const multer = require("multer");
const objection = require("objection");
const Model = objection.Model;
const Knex = require("knex"); 
const knexConfig = require("../knexfile.js");
const knex = Knex(knexConfig.development);
Model.knex(knex);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {   // checking if this is image or not
    if (file.mimetype.startsWith("image")) {
      cb(null, `${Date.now()}${file.originalname}`);
    } else {
      cb(res.status(400).send({ response: `Please upload only images` }), false);
    }
  }
});


const upload = multer({ storage: storage });

 
router.post("/upload", upload.single('image'), (req, res) => {

  
   try {

    if (req.file == undefined) {
      return res.status(400).send({response: `Please select a file`});
    }

    Image.query().insert({
      title: req.file.originalname,
      
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/tmp/" + image.title,
        image.data
      );
      console.log(req.file);
      return res.send({ response: `Image has been added to the gallery` });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ response:`Error when trying upload image: ${error}`});
  }
});


module.exports = router; 