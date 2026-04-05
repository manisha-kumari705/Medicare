import { useState, useEffect } from 'react'
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://medicare-backend-delta.vercel.app/api/dashboard/stats"
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://medicare-backend-delta.vercel.app/api/dashboard/stats"
        );
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Doctors</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.doctors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Patients</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.patients}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard