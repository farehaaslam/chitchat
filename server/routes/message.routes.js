import Message from "../models/message.models.js";
import express from "express"
import { getMessages, getUserforSidebar, sendMessage } from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router()
router.get("/user",protectRoute,getUserforSidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

export default router
