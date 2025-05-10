const jwt = require("jsonwebtoken")

const checkAuth = (req,res,next)=>{
    try {
        // get token from cookies
        let token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"user is not authenticated"})
        }

        // Separated the ID or secret key
        let decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        // Stored the ID in the request object
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(500).json({message:`${error}`})
    }

}
module.exports = checkAuth