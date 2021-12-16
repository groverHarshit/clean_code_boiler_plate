const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/images/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

uploadSingle    = (field) => upload.single(field);
uploadSingleAny = () => upload.any();
uploadMultiple  = (fields) => upload.fields(fields); 
uploadArray  = (key) => upload.array(key); 

module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadSingleAny,
    uploadArray 
}