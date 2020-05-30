//routes are client site

const router = require("express").Router(); 


router.get("/photos", (req,res) => {

    return res.send({response: photos.slice(start,end)});
});

//access the particular photo json using the fileName
router.get("/photos/:photoId", (req,res) => {

    return res.send({response: photos.find(photo => photoId.fileName === req.params.photoId)});
});

router.post("/photos", async (req, res, next) => {
try {
    const {photo} = req.body;



    if (errors.length > 0) {
        return res.send({ response: errors });
    } else {

        const uploadedPhoto = await Photo.query().insert({
            photo,
            description,
        });

        return res.send({ response: `Photo has been uploaded` });
    }
}
 catch (err) {
    next(err);
  }

});

module.exports = router