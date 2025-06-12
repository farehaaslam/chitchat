import User from "../models/user.models.js"
import Message from "../models/message.models.js"
import cloudinary from "../lib/cloudinary.js"
export const getUserforSidebar=async (req,res) => {
    try {
        const loggedInUser=req.user._id
        const fillteredUser=await User.find({_id:{$ne:loggedInUser}}).select("-password")
        res.status(200).json(fillteredUser)
    } catch (error) {
        console.error("error in get user for sidebar ",error.message);
        res.status(500).json({
            message:"internal server error "
        })      
    }
    
}
export const getMessages=async (req,res) => {
    try {
         const {id:userTochatId}=req.params
    const myId=req.user._id
    const message=await Message.find({
        $or:[
            {senderId:myId,receiverId:userTochatId},
            {senderId:userTochatId,reciverId:myId}
        ]
    })
    res.status(200).json(message)

    } catch (error) {
         console.error("error in get message ",error.message);
        res.status(500).json({
            message:"internal server error "
        })
        
        
    }
   
    
}
export const sendMessage=async (req,res) => {
    try {
        const {text,image}=req.body
        const{id :receiverId}=req.params
        const senderId=req.user._id

        let imageUrl;
        if (image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save();

        //socket io work
        res.status(201).json(newMessage)
        
    } catch (error) {
        console.error("error in sending message ",error.message);
        res.status(500).json({
            message:"internal server error "
        })
        
        
    }
    
}