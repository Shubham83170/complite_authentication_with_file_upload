const cloudinary =require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDE_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(filePath)=>{
    try {
        if(!filePath){
            return null
        }

        let result = await cloudinary.uploader.upload(filePath)
        // console.log(result);
        fs.unlinkSync(filePath)
        return result.secure_url
        
    } catch (error) {
        fs.unlinkSync(filePath)
        // console.log(error);
        
        
    }

}
module.exports = uploadOnCloudinary