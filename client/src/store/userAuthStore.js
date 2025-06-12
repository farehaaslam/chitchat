import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
export const userAuthStore=(set)=>({
    authUser:null,
    isSignup:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
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
    }
})