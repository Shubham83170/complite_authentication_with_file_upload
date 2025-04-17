const mongoose = require("mongoose")
const db =process.env.CONNECTION
mongoose.connect(db).then((d)=>{
    console.log("db connection is ok");

    
}).catch((error)=>{

    console.log(`message:${error}`);
    
})

module.exports = mongoose