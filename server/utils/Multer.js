const multer = require('multer');
const path  = require('path');

// Multer Config

module.exports = multer({
   storage : multer.diskStorage({}),
   fileFilter : (req, file, cb)=>{
    let ext = path.extname(file.originalname);
    if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg"){
      cb(new Error("File type not supported"), false)
      return;
    }
    cb(null, true)
   }
})