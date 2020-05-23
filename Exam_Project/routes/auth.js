const router = require("express").Router();
const path = require('path'); // joins path variables into one

router.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;