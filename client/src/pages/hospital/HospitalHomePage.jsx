import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, QrCode, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import assets from "../../assets/assets";

import Dashboard from "./Dashboard";
import Doctors from "./Doctors";
import Patients from "./Patients";

import { useAppContext } from "../../context/AppContext";

const HospitalHomePage = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);

  // 🔥 Updated Sidebar (Your Project)
  const sidebarLinks = [
    { name: "Dashboard", path: "/hospital", icon: LayoutDashboard },
    { name: "Doctors", path: "/hospital/doctors", icon: Users },
    { name: "Patients", path: "/hospital/patients", icon: UserCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef9ff]">

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r z-50 transform transition-transform duration-300 
        ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <img className="w-20" src={assets.logo} alt="logo" />

          <button
            className="md:hidden cursor-pointer"
            onClick={() => setOpenSidebar(false)}
          >
            <X size={30} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100vh-60px)]">
          {sidebarLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === "/hospital"}
                onClick={() => setOpenSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-sky-100 text-sky-600"
                      : "text-gray-700 hover:bg-sky-50"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* HEADER */}
        <div className="bg-white border-b p-4 flex justify-between items-center">

          {/* Mobile Menu */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          >
            <Menu size={26} />
          </button>

          <h1 className="text-lg font-semibold text-sky-700 hidden md:block">
            Hospital Portal
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-sky-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">

          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default HospitalHomePage;