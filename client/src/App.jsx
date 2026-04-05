import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import MedicalCardPage from "./pages/MedicalCardPage";
import PatientQR from "./pages/PatientQR";  

// 🏥 Hospital Pages
import HospitalHomePage from "./pages/hospital/HospitalHomePage";
import Login from "./pages/hospital/Login";

// doctor pages
import DoctorHomePage from "./pages/doctor/DoctorHomePage";
import DoctorLogin from "./pages/doctor/DoctorLogin";

// 🔐 Context
import { useAppContext } from "./context/AppContext";
import ScrollToTop from "./ScrollToTop";

function App() {
  const location = useLocation();
  const { user } = useAppContext();

  // 👉 Hide Navbar & Footer on hospital & doctor panel
  const isPanelRoute =
    location.pathname.startsWith("/hospital") ||
    location.pathname.startsWith("/doctor") ||
    location.pathname.startsWith("/patient");

  return (
    <div>

      <Toaster position="top-right" />

      {/* ✅ Show only on normal pages */}
      {!isPanelRoute && <Navbar />}

      <ScrollToTop />

      <Routes>
        {/* 🔷 Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={ user && user.role === "user" ? (<HomePage /> ) : ( <RegisterPage /> )}/>
        <Route path="/card" element={<MedicalCardPage />} />
        {/* 🔥 QR Route */}
        <Route path="/patient/:id" element={<PatientQR />} />

        {/* 🔐 Hospital Login */}
        <Route path="/hospital/login" element={<Login />} />

        {/* 🏥 Hospital Protected Route */}
        <Route
          path="/hospital/*"
          element={
            user && user?.role === "hospital" ? (
              <HospitalHomePage />
            ) : (
              <Login />
            )
          }
        />

        {/* 🏥 Doctor Protected Route */}
        <Route
          path="/doctor/*"
          element={
            user && user?.role === "doctor" ? (
              <DoctorHomePage />
            ) : (
              <DoctorLogin />
            )
          }
        />
      </Routes>

      {/* ✅ Hide footer in panels */}
      {!isPanelRoute && <Footer />}
    </div>
  );
}

export default App;