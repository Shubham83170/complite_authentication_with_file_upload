const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public") //public name se backend me folder banana h tb ja kr use save hoga khud se folder create nhi hoga.
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,file.originalname)
        
    }
})
const upload = multer({storage})
module.exports = upload;