const multer = require("multer");

/*
Multer memory storage for storing image in memory, and process it with sharp
*/
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/jpeg")) cb(null, true);
        else cb("Please upload only images in JPEG format.", false);
    },
});

module.exports = upload;
