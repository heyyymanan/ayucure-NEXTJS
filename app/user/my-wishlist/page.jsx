"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import refreshToken from "@/lib/utils/refreshToken";
import { useRouter } from "next/navigation";

const UserWishlist = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/wishlist`,
        { withCredentials: true }
      );

      
      setWishlist(res.data);
      setError("");
    } catch (err) {
      const status = err?.response?.status;
      const statusText = err?.response?.statusText;

      if (status === 401 && statusText === "Unauthorized") {
        const refreshed = await refreshToken();
        if (refreshed) return fetchWishlist();
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to load wishlist.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("isLoggedin")){
      fetchWishlist();
    }else{
      setError("Please Login First")
      router.push("/")
    }
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {loading && <p>Loading wishlist...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && wishlist.length === 0 && (
        <p className="text-gray-600">No items in your wishlist.</p>
      )}

      {Array.isArray(wishlist) &&
        wishlist.map((item) => (
          <div key={item._id} className="border p-4 rounded mb-4 shadow">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
            {/* Add more item details as needed */}
          </div>
        ))}
    </div>
  );
};

export default UserWishlist;
