import multer from "multer";


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'imagenes/');
    },
    filename: function(req, file,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage})


export default upload;




