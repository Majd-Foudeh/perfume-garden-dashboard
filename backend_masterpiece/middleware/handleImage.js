const multer =require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images"); // Specify the destination folder for saving the images
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      ); // Generate a unique filename
    },
  });
  
  const upload = multer({
    storage: storage,
  });

  module.exports={upload}