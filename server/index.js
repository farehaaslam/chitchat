import express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import  startServer from "./db.js"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
import { app,server } from "./lib/socket.js"

import path from "path"
const PORT = process.env.PORT || 3000
const __dirname=path.resolve()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true , limit: '10mb' }));
app.use (cookieParser())

app.use("/api/user",userRouter)
app.use("/api/message",messageRouter) 
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../client/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    })
}
startServer(app,PORT)
