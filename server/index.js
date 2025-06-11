import express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import  startServer from "./db.js"
import userRouter from "./routes/user.routes.js"
const app = express()


const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (cookieParser())

app.use("/user",userRouter) 
startServer(app,PORT)