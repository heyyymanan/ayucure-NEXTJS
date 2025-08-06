"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import refreshToken from "@/lib/utils/refreshToken";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router=useRouter();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        { withCredentials: true }
      );
      setProfile(res.data);
      setError("");
    } catch (err) {
      const status = err?.response?.status;
      const statusText = err?.response?.statusText;

      if (status === 401 && statusText === "Unauthorized") {
        const refreshed = await refreshToken();
        if (refreshed) return fetchProfile();
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    if(localStorage.getItem("isLoggedin")){
      fetchProfile();
    }else{
      setError("Please Login First")
      router.push("/")
    }
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {loading && <p>Loading profile...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {profile && (
        <div className="border p-4 rounded shadow">
          <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> +{profile.phone_number.slice(0, 2)} {profile.phone_number.slice(2)}</p>
        
        </div>
      )}
    </div>
  );
};

export default UserProfile;
