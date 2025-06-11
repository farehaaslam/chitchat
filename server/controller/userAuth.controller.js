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
        isOnline,
        displayName
    }=req.body;
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
await newUser.save()
console.log("new user added to db");

    }
    catch(error){
        console.log(error)
        res.json({
            "error":error.message
        })
    }
 

}