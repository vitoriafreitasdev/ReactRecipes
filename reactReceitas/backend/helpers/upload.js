

// const multer = require("multer")

// const path = require("path")

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, "../public/images/"))
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" ){
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// const upload = multer({
//     storage, 
//     fileFilter
// })

// module.exports = upload

// backend/config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'receitas', // Pasta no Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, crop: 'limit' }] // Redimensiona automaticamente
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

module.exports = upload;