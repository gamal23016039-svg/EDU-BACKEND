const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads");
    },
    filename(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `user-${Date.now()}.${ext}`);
    }
});

module.exports = multer({ storage });