//routes are client site

const router = require("express").Router(); // explainedbeggining of recording of 26.03
//const uuid = require('uuid').v4;            //generating unique id, Universally Unique IDentifiers 
//console.log(uuid());   // so i can copy it from console line and rename my file likewise in every place 

const crypto = require("crypto");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "videos/");
    },
    filename: (req, file, cb) => {   // checking if this is video or not
        const fileName = crypto.randomBytes(20).toString("hex");
        const mimetypeArray = file.mimetype.split("/");   //  MIME type (or media type) is an identifier for file formats on the Internet. MIME stands for Multipurpose Internet Mail Extension
        if (mimetypeArray[0] === "video") {
            const extension = mimetypeArray[mimetypeArray.length - 1];
            cb(null, fileName + "." + extension);
        } else {
            cb("Not a video error. Mimetype: " + file.mimetype);
        }
    }
});
const upload = multer({ storage: storage });

// todo what data should be inside of each vide object
const videos = [{
    title:"Ocean Waves",
    description:"Watch the waves and enjoy",
    fileName: "N1180054c-59f3-44e6-a702-e0e4082d882f.mp4",
    thumbnail: "",
    category: "Nature",
    tags: ["waves", "ocean", "coast"],
    uploadDate:  new Date(2020, 3 , 26, 08, 43)
}];

const videosPerPage = 10;    // we start to implement pagination 


router.get("/videos", (req,res) => {
    const page = Number(req.query.page) ? Number(req.query.page) : 1;     /// if the client forgets to mention the page, Im gonna assume this is page one
    const start = (page-1)* videosPerPage;
    const end = start + videosPerPage;

    // page 1    0, 10
    // page 2   10, 20
    // page 3   20, 30

    return res.send({response: videos.slice(start,end)});
});

//access the particular video json using the fileName
router.get("/videos/:videoId", (req,res) => {

    return res.send({response: videos.find(video => videoId.fileName === req.params.videoId)});
});

router.post("/videos", upload.single('video'), (req, res) => {
   /* console.log(req.body);
    console.log(req.file); */

    let errors = [];

    // 1.server side validate  //2 create and add object
    const video = {
        fileName: req.file.filename,
        thumbnail: "",  //todo
        description: req.body.description || "",
        category: req.body.category || "Unknown",
        tags: req.body.tags.split(/\[\s*]\s*/),   //s means whitespace
        uploadDate: new Date()
    };


    if (video.title.length < 8 || video.title.length > 64) {
        errors.push("Title can't be between 8 and 64.");
    }

    if (video.description.length > 2048) {
        errors.push("The description can't be longer than 2048 chars.");
    }

    if (errors.length > 0) {
        return res.send({ response: errors });
    } else {
        videos.push(video);
        return res.redirect(`/player/$video.fileName`); // redirect directly to the player once video gets uploaded
    } 
});


module.exports = router