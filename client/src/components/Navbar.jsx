import React from 'react'
import {userAuthStore} from '../store/userAuthStore.js'
import { Link } from 'react-router-dom'
import {Settings} from 'lucide-react'

const Navbar = () => {
  const {authUser,logout}=userAuthStore()
  return (
    <div>
   { authUser?
   <div>
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-[25px] text-amber-400 font-extrabold">chitChat</a>
  </div>
  <div className="flex gap-2">
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
             src={authUser.profilepic || "/avatar.png"}
            />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile'className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to='/setting'>Settings</Link></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
   </div>
   :
   <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-[25px] text-amber-400 font-extrabold">chitChat</a>
  </div>
  <div className="flex-none">
    <Link to='/setting' className="btn btn-square btn-ghost" >
      <Settings/>
    </Link>
  </div>
</div>}
    </div>
  )
}

export default Navbar