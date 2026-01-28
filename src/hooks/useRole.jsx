import { useEffect, useState } from "react";
// import axios from "axios";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosIntance = useAxiosSecure()

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("access-token");

    setLoading(true);
    
      axiosIntance.get(`http://localhost:5000/users/role/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRole(res.data.role);
        console.log("User Role:", res.data.role);
      })
      .catch((err) => {
        console.error("Failed to fetch role", err);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return [role, loading];
};

export default useRole;
