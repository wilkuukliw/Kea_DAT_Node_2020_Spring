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
    filename: (req, file, cb) => {
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
    console.log(req.file);
    return res.redirect("/");
});


module.exports = router