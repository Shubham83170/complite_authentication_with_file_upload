const jwt = require("jsonwebtoken")

const generateToken = (id)=>{
    // generate token with user id and jwt secret key
    let token = jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
    return token
}

module.exports = generateToken