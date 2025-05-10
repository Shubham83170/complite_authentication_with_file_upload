const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public") //The folder named public must be created manually in the backend. The server won't automatically create it when saving files (like uploads, images, etc.)
    },
    filename:(req,file,cb)=>{
        // console.log(file);
        cb(null,file.originalname)
        
    }
})
const upload = multer({storage})
module.exports = upload;