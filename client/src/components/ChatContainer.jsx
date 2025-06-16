import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { userAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useRef } from "react";
const ChatContainer = () => {
  const { messages, isMessageLoading, getMessages, selectedUser,subscribeToMessage,unsubscribeFromMessages } =
    useChatStore();
const messageEndRef=useRef(null)
  //console.log(selectedUser);
  const { authUser } = userAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage()
    return ()=>unsubscribeFromMessages()
  }, [selectedUser._id]);
// console.log(messages);
useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);


  if (isMessageLoading)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex flex-1 flex-col overflow-auto ">
     {messages.map((message) => (
  <div
    key={message._id}
    className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
    
  >
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src={
            message.senderId === authUser._id
              ? authUser.profilepic || "/avatar.png"
              : selectedUser?.profilepic || "/avatar.png"
          }
          
        />
        <div ref={messageEndRef}></div>
      </div>
    </div>
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">
         {formatMessageTime(message.createdAt)}
      </time>
    </div>
    <div className="chat-bubble flex flex-col">
      {message.image && (
        <img
          src={message.image}
          alt="Attachment"
          className="sm:max-w-[200px] rounded-md mb-2"
        />
      )}
      {message.text && <p>{message.text}</p>}
    </div>
  </div>
))}

      </div>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
