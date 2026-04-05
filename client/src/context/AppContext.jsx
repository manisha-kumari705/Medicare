import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  // ✅ USER STATE
  const [user, setUser] = useState(null);

  // ✅ FORM DATA (for normal user)
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    dob: "",
    phone: "",
    email: "",
    password: "",
    age: "",
    fullAddress: "", 
    bloodGroup: "",
    allergies: [],
    diseases: [],
    image: "",
  });

  // ================= USER LOGIN =================
  const loginUser = (userData) => {
    setUser(userData);

    // ✅ Save user also (IMPORTANT for refresh)
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // ================= HOSPITAL LOGIN (API BASED) =================
  const loginHospital = async (email, password) => {
    try {
      const res = await fetch("https://medicare-backend-delta.vercel.app/api/hospital/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // ✅ Save token
      localStorage.setItem("hospitalToken", data.token);

      // ✅ Save hospital data
      localStorage.setItem("hospitalData", JSON.stringify(data.hospital));

      // ✅ Set user (role based)
      setUser({
        ...data.hospital,
        role: "hospital",
      });

      return data;

    } catch (error) {
      throw error;
    }
  };

  // ================= Doctor Login =================
  const loginDoctor = async (email, password) => {
    try {
      const res = await fetch("https://medicare-backend-delta.vercel.app/api/doctors/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // ✅ Save token
      localStorage.setItem("doctorToken", data.token);
      localStorage.setItem("doctorData", JSON.stringify(data.doctor));

      // ✅ Set user
      setUser({
        ...data.doctor,
        role: "doctor",
      });

      return data;

    } catch (error) {
      throw error;
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);

    // ✅ Reset user form
    setFormData({
      fullName: "",
      gender: "Male",
      dob: "",
      age: "",
      phone: "",
      email: "",
      password: "",
      fullAddress: "",
      bloodGroup: "",
      allergies: [],
      diseases: [],
      image: "",
    });

    // ✅ Clear user storage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // ✅ Clear hospital storage
    localStorage.removeItem("hospitalToken");
    localStorage.removeItem("hospitalData");

    // ✅ Clear doctor storage
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorData");
  };

  // ================= PERSIST LOGIN =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hospitalToken = localStorage.getItem("hospitalToken");
    const doctorToken = localStorage.getItem("doctorToken");

    const storedUser = localStorage.getItem("userData");
    const hospitalData = localStorage.getItem("hospitalData");
    const doctorData = localStorage.getItem("doctorData");

    // 🔹 USER
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setFormData(parsedUser);
    }

    // 🔹 HOSPITAL
    if (hospitalToken && hospitalData) {
      const parsedHospital = JSON.parse(hospitalData);

      setUser({
        ...parsedHospital,
        role: "hospital",
      });
    }

    // 🔹 DOCTOR (ADDED 🔥)
    if (doctorToken && doctorData) {
      const parsedDoctor = JSON.parse(doctorData);

      setUser({
        ...parsedDoctor,
        role: "doctor",
      });
    }

  }, []);

  // ================= CONTEXT VALUE =================
  const value = {
    formData,
    setFormData,
    user,
    setUser,
    loginUser,
    loginDoctor,
    loginHospital,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};