const jwt = require("jsonwebtoken")

const generateToken = (id)=>{
    let token = jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
    return token
}

module.exports = generateToken