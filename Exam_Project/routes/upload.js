const router = require("express").Router();

const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

  router.post("/upload", upload.single("file"), uploadController.uploadFiles);


  module.exports = router;