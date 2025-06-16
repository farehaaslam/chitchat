import React from 'react'
import { useState } from "react";
import { userAuthStore } from '../store/useAuthStore.js'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";   
import  GridMotion from "../lib/Grid.jsx"
import toast from "react-hot-toast";


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "", 
  });

  const {login, isLoggingIn}=userAuthStore()
   const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
   // if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) login(formData);
  };
  const items = [  
  'https://images.pexels.com/photos/6670795/pexels-photo-6670795.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/221258/pexels-photo-221258.jpeg?auto=compress&cs=tinysrgb&w=600',
   'https://in.pinterest.com/pin/1759287347993994/',
   'https://images.pexels.com/photos/70913/pexels-photo-70913.jpeg?auto=compress&cs=tinysrgb&w=600',  
  'https://images.pexels.com/photos/6670795/pexels-photo-6670795.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=600', 
  'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/221258/pexels-photo-221258.jpeg?auto=compress&cs=tinysrgb&w=600',
   'https://images.pexels.com/photos/70913/pexels-photo-70913.jpeg?auto=compress&cs=tinysrgb&w=600',  
  'https://images.pexels.com/photos/6670795/pexels-photo-6670795.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=600', 
  'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/221258/pexels-photo-221258.jpeg?auto=compress&cs=tinysrgb&w=600',
   'https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&w=600',
   'https://images.pexels.com/photos/70913/pexels-photo-70913.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2287353/pexels-photo-2287353.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6670795/pexels-photo-6670795.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=600',
 'https://images.pexels.com/photos/2287353/pexels-photo-2287353.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/221258/pexels-photo-221258.jpeg?auto=compress&cs=tinysrgb&w=600',
   'https://images.pexels.com/photos/2287353/pexels-photo-2287353.jpeg?auto=compress&cs=tinysrgb&w=600',
   'https://images.pexels.com/photos/70913/pexels-photo-70913.jpeg?auto=compress&cs=tinysrgb&w=600',
   
];

  return (
     <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Sign in </h1>
              <p className="text-base-content/60">sign in to an existing account</p>
            </div>
          </div>

         <form onSubmit={handleSubmit} className="space-y-6">
           
                  
             <div className="form-control">
               <label className="label">
                <span className="label-text font-medium">Email</span>
                              </label>
             <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
                 <input
                   type="email"
                   className={`input input-bordered w-full pl-10`}
                   placeholder="you@example.com"
                 value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 />
               </div>
             </div>

          <div className="form-control">
               <label className="label">
                 <span className="label-text font-medium">Password</span>
               </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Lock className="size-5 text-base-content/40" />
                 </div>
                 <input
                   type={showPassword ? "text" : "password"}
                   className={`input input-bordered w-full pl-10`}
                   placeholder="••••••••"
                   value={formData.password}
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 />
                 <button
                   type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                   onClick={() => setShowPassword(!showPassword)}
                >
                   {showPassword ? (
                     <EyeOff className="size-5 text-base-content/40" />
                   ) : (
                     <Eye className="size-5 text-base-content/40" />
                   )}
                 </button>
               </div>
          </div>

           <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                   <Loader2 className="size-5 animate-spin" />
                   Loading...
               </>
              ) : (
                 "Sign in"
             )}
           </button>
           </form>

           <div className="text-center">
             <p className="text-base-content/60">
               Don't have an account ?{" "}
               <Link to="/signup" className="link link-primary">
                 Sign up
               </Link>
             </p>
           </div>
         </div>
      </div>

       {/* right side */}
<div  className="hidden  lg:block" >
    <div className="h-10/12  my-[2px]">
        <GridMotion items={items}  />

    </div>
</div>
</div>
  )
}

export default SignIn