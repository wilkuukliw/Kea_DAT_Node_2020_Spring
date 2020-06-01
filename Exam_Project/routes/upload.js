const router = require("express").Router();


const fs = require("fs");

const db = require("../models");
const Image = db.images;

const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {   // checking if this is video or not
    if (file.mimetype.startsWith("image")) {
      cb(null, `${Date.now()}${file.originalname}`);
    } else {
      cb(res.status(400).send({ response: `Please upload only images` }), false);
    }
  }
});


const upload = multer({ storage: storage });



router.get("/images", (req,res) => {
  return res.send({response: images});
});



router.post("/upload", upload.single('image'), (req, res) => {

   try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.status(400).send({response: `Please select a file`});
    }

    Image.create({
      type: req.file.mimetype,
      image: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/tmp/" + image.name,
        image.data
      );

      return res.send({ response: `Image has been added to the gallery` });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ response:`Error when trying upload image: ${error}`});
  }
});

module.exports = router; 