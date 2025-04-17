const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser =require("cookie-parser")
require("dotenv").config()
require("./database/connection")



const myroutes = require("./routes/myroutes")
const port = process.env.PORT
app.use(cors(
    {origin:"http://localhost:5173",
        credentials:true
    }
))
app.use(express.json()) // ye line hamesh app.use(myroutes) eske upr rhega 
app.use(cookieParser())//ye line hamesh app.use(myroutes) eske upr rhega 
app.use(myroutes)



app.listen(port,()=>{
    console.log(`server is runing on ${port}`);
    
})