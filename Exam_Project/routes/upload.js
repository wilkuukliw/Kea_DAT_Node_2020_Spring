const router = require("express").Router();
const Image = require('../models/Image.js');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {   // Indicates where you want to save your files
      cb(null, "uploads/");
  },

  filename: (req, file, cb) => {   //Indicates how you want your files named. 
    if (file.mimetype.startsWith("image")) {
      cb(null, `${Date.now()}${file.originalname}`);
    } else {
      cb(res.status(400).send({ response: "Please upload only images" }), false);
    }
  }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single('image'), (req, res) => {   //When an image is received by the route, it will be automatically saved by multer to the directory you previously specified. The upload.single call is handled by the multer middleware.

   try {

    if (req.file == undefined) {
      return res.status(400).send({response: "Please select a file"});
    }

    Image.query().insert({
      title: req.file.originalname,
      
     }).then(() => {
      console.log(req.file);
      return res.redirect('/images');
   
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ response:`Error when trying upload image: ${error}`});
  }
});

module.exports = router; 