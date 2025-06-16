
import cloudinary from "../lib/cloudinary.js";
import { genratejwt } from "../lib/utils.js";
import  User from "../models/user.models.js"
import bcrypt from "bcrypt"
const saltRounds=8
export const userSignup=async(req,res)=>{
    console.log(req.body);
    const{
        email,
        name,
        password,
        profilepic,
        displayName
    }=req.body;
    if(!email || !name || !password || !displayName){
        return res.status(400).json({
            message:"all field are required"
        })
    }
    if(password.length<6){
        return res.status(400).json({
            message:"password must be 6 character "
        })
    }
    try{
           const person=await User.findOne({email})
    if(person){
       return res.status(201).json({
            message:"user already exist", 
        })  
    }
    const hashedPassword=await bcrypt.hash(password, saltRounds);
    const newUser=new User({
        email,
        name,
        password:hashedPassword,
        profilepic,
        displayName
    })
    if(newUser){
        genratejwt(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
            name:newUser.name,
            displayName:newUser.displayName,
            profilepic:newUser.profilepic
        })
    }
    else{
        res.status(400).json({
            message:"invalid user data"
        })

    }

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({
            message:"internal server error"
        })
    }
 

}
export const userLogin=async (req,res) => {
    const {
        email,
        password
    }=req.body;
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"already a user , sign in"
            })
        }
       const isPasswordCorrect= await bcrypt.compare(password,user.password)
       if(!isPasswordCorrect){
         return res.status(400).json({
                message:"incorrect password"
            })
       }
       genratejwt(user._id,res)
       res.status(200).json({
          _id:user._id,
            email:user.email,
            name:user.name,
            displayName:user.displayName,
            profilepic:user.profilepic
        } )
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({
            message:"internal server error"
        }) 
    }
   
}
export const userlogout=async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"log out succesfully"
        })
    } catch (error) {
        console.log("error in logout controller");
        res.status(500).json({
            message:"internal server error"
        }) 
    }
    
}
export const updateProfile=async (req,res) => {
    try {
        const {profilepic}=req.body;
        const userId=req.user._id;
        if(!profilepic){
            return res.status(400).json({
                message:"profile pic is required"
            });
        }
        const uploadResponse=await cloudinary.uploader.upload(profilepic);
        const updatedUser=await User.findByIdAndUpdate(
            userId,
            {profilepic:uploadResponse.secure_url},
            {new:true} 
        )
        console.log("Cloudinary upload response:", uploadResponse);
        console.log("updated uuser response :", updatedUser);


        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in updating profile pic :",error.message);
        res.status(500).json({
            message:"internal sever error"
        })
    }
    
}
export const check=(req,res)=>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {
        console.log("error in auth controller ",error.message);
        res.status(500).json({
            message:"internal sever error"
        })
        
    }
}

//to create controller for update about and display name 