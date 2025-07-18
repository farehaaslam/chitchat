import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js'
import { userAuthStore } from './useAuthStore.js'
export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    getUsers:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get('/message/user/')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message); 
        }
        finally{
            set({isUserLoading:false})
        }

    },
    getMessages:async(userId)=>{
        set({isMessageLoading:true})
         try {
            const res=await axiosInstance.get(`/message/${userId}/`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message); 
        }
        finally{
            set({isMessageLoading:false})
        }
    },
    sendMessage:async(userMessage)=>{
        const {selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,userMessage)
            set({messages:[...messages,res.data]})
        } catch (error) {
              toast.error(error.response.data.message); 
        }

    },
    subscribeToMessage:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return;
        const socket=userAuthStore.getState().socket
        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromSelectedUser=newMessage.senderId===selectedUser._id
            if(!isMessageSentFromSelectedUser) return
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },
    unsubscribeFromMessages:()=>{
        const socket=userAuthStore.getState().socket
        socket.off("newMessage");
    },
    setSelectedUser:(selectedUser)=> set({selectedUser:selectedUser})

    

})
)