const router = require('express').Router();

router.get("/images", (req,res) => {
    return res.send({response: images});
  });
  
  module.exports = router;



  //todo: retrieve images from database