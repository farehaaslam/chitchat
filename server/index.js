import express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import  startServer from "./db.js"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (cookieParser())

app.use("/api/user",userRouter)
app.use("/api/message",messageRouter) 
startServer(app,PORT)