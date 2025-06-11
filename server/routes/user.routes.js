import express from "express"
import {check, updateProfile, userLogin, userlogout, userSignup} from '../controller/userAuth.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js"
const router=express.Router()
router.post("/signup",userSignup)
router.post("/login",userLogin)
router.post("/logout",userlogout)
router.put("/update",protectRoute,updateProfile)
router.get("/check",protectRoute,check)
export default router

