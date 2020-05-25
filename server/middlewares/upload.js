const multer = require("multer");
const config = require('../config.js')
const imageFilter = (req, file, cb) => {
    // console.log('imageFilter', file)
    // console.log('imageFilter', req)
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      
    cb(null, "./resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
      
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;