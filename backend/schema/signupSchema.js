const mongoose = require("mongoose")

const mySchemaPattern =new mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String
    },
    age:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    profileImage:{
        type:String
    }
})
const mySchema= new mongoose.model("authentiction",mySchemaPattern)
module.exports =mySchema