import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShieldPlus, Menu, X, LogIn, LogOut } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import UserLogin from "./UserLogin";

const Navbar = () => {

  const { user, logout } = useAppContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate= useNavigate();

  // ✅ NAV LINKS DATA (Reusable)
  const navLinks = [
    { name: "Home", path: "/" },

    // ✅ Show Register ONLY when user is NOT logged in as normal user
    ...(!user || user.role !== "user"
      ? [{ name: "Register", path: "/register" }]
      : []),

    { name: "My Medical Card", path: "/card" },
    { name: "Doctor Portal", path: "/doctor" },
  ];

  return (
    <nav className="sticky top-0 z-50 mb-10 w-full bg-linear-to-r from-blue-900 via-blue-700 to-blue-500 text-white shadow-md">
      
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <ShieldPlus className="w-8 h-8" />
          <h1 className="text-lg md:text-xl font-semibold">
            Medical Profile Card
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-300 
                hover:text-gray-200 
                ${
                  isActive
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white"
                    : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT BUTTONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition"
            >
              <LogIn size={18} />
              Login
            </button>
          )} 

          <button onClick={()=> navigate('/hospital')} className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition">
            <LogIn size={18} />
            Admin Login
          </button>          
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden">
          {isOpen ? (
            <X onClick={() => setIsOpen(false)} className="w-7 h-7 cursor-pointer" />
          ) : (
            <Menu onClick={() => setIsOpen(true)} className="w-7 h-7 cursor-pointer" />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden p-4 flex flex-col gap-2 bg-blue-800">
          
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-2 rounded-md text-sm transition 
                hover:bg-blue-700 
                ${isActive ? "bg-blue-600 font-semibold" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* MOBILE BUTTONS */}
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition"
            >
              <LogIn size={18} />
              Login
            </button>
          )}

          <button onClick={()=> navigate('/hospital')} className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <LogIn size={18} />
            Admin Login
          </button>
        </div>
      )}
      <UserLogin show={showLogin} setShow={setShowLogin} />
    </nav>
  );
};

export default Navbar;