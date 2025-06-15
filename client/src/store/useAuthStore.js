import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
export const userAuthStore=create((set)=>({
    authUser:null,
    isSigningup:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    
    checkAuth:async () => {
        try {
           const res= await axiosInstance.get('/user/check')
           set({authUser:res.data})

        } catch (error) {
            set({authUser:null})
            console.error("error in user auth store :",error.message);
            
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup :async (data) => {
        set({isSigningup:true})
        try {
            const res=await axiosInstance.post('/user/signup',data)
            set({authUser:res.data})
            toast.success("account created succesfully");
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
        finally{
            set({isSigningup:false})
        }
        
    },
    logout:async(data)=>{
        try {
            const res=await axiosInstance.post('/user/logout')
            set({authUser:null})
            toast.success("logout succesfully")


        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post('/user/login',data)
            set({authUser:res.data})
            toast.success("succesfully logged in");
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile:async(data)=>{
         set({isUpdatingProfile:true})
         try {
            const res=await axiosInstance.put('/user/update',data)
            set({authUser:res.data})
            toast.success("update profile photo succesfully")
         } catch (error) {
             toast.error(error.response.data.message);
            
         }
         finally{
        set({isUpdatingProfile:false})
         }
    }
}))