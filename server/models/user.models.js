import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilepic:{
    type: String,
    default:"",
  },
  isOnline:{
    type:Boolean,
    default:false,
  },
  displayName:{
    type:String,
    required:true,
  }

},{
    timestamps:true,
});
const User = mongoose.model('User', userSchema)
export default User;

