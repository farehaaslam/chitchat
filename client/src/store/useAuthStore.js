import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { io} from "socket.io-client"
const BASE_URL="http://localhost:3000/"
export const userAuthStore=create((set,get)=>({
    authUser:null,
    isSigningup:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    
    checkAuth:async () => {
        try {
           const res= await axiosInstance.get('/user/check')
           set({authUser:res.data})
           get().connectSocket()

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
            get().connectSocket()
            
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
            get().disconnectSocket()


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
            get().connectSocket()
            
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
    },
    connectSocket:()=>{
        const {authUser,socket}=get()
        if(!authUser || (socket && socket.connected) ) return;
        const newSocket=io(BASE_URL, {
    query: {
      userId: authUser._id,  // or `authUser.id` based on your backend schema
    }})
        newSocket.connect()
      //  console.log("connecting");

          set({ socket: newSocket }); 
        newSocket.on("getOnlineUsers" ,(userIds)=>{
            set({onlineUsers:userIds})

          })

    },
    disconnectSocket:()=>{
         const { socket } = get();
    if (socket) {
        socket.disconnect();
        set({ socket: null, onlineUsers: [] });
    }
        
    }

}))