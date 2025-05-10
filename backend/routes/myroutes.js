const express = require("express")
const mySchema = require("../schema/signupSchema")
const bcrypt = require("bcryptjs")
const generateToken = require("../jwttoken/jwttoken")
const upload = require("../multer/multer")
const uploadOnCloudinary = require("../cloudinary/cloudinary")
const checkAuth = require("../midleware/checkauth")
const app = express.Router()


// for signup page
app.post("/signup", upload.single("profileImage"), async (req, res) => {
    try {
        let { name, userName, age, email, password } = req.body

        if (!name || !userName || !age || !email || !password) {
            return res.status(400).json({ message: "send all data" })

        }
        // for cloudinary
        let profileImage;
        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }
        // console.log(req.file);

        // same email id hoga to error show krega
        const existUser = await mySchema.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: " user already exist! Please change your email id" })
        }

        // password hash (install bcryptjs)
        const hashPass = await bcrypt.hash(password, 10)

        const user = await mySchema.create({
            name, userName, age, email, password: hashPass, profileImage
        })

        // token generate with user id
        let token = generateToken(user._id)

        // create cookie(install cookie-parser)eske bad cors me creditial true krna h, or client api me bhi krna hoga.
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            user: {
                name, userName, age, email
            }
        })
    } catch (error) {
        res.status(404).json({ message: `${error}` })
    }
})



// for log in
app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ message: "fill all data" })
        }

        const existUser = await mySchema.findOne({ email })
        if (!existUser) {
            return res.json({ message: "user does not exist" })
        }

        // match password
        const matchPassword = await bcrypt.compare(password, existUser.password)
        if (!matchPassword) {
            return res.json({ message: "inccorect password" })
        }

        // generate token with user id and jwt secret key

        const token = generateToken(existUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            user: {
                name: existUser.name,
                age: existUser.age,
                email: existUser.email,
                userName: existUser.userName
            }
        })
    } catch (error) {
        res.status(404).json({ message: `${error}` })
    }
})


// get all user data
app.get("/landing", async (req, res) => {
    try {
        const allUsers = await mySchema.find()
        return res.status(200).json(allUsers)
    } catch (error) {
        res.status(404).json({ message: `${error}` })
    }
})



// for log out
app.post("/logout", (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "log Out successful" })

    } catch (error) {
        res.status(404).json({ message: `${err}` })
    }
})



// To fetch data only for the authenticated user
app.get("/getuserdata", checkAuth, async (req, res) => {
    try {
        let userId = req.userId
        if (!userId) {
            return res.status(400).json({ message: "user id not found" })
        }
        let user = await mySchema.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "user not found" })

        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error })

    }
})


module.exports = app
