"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import refreshToken from "@/lib/utils/refreshToken";
import { FaBoxOpen, FaRupeeSign, FaClock, FaCheckCircle } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/orders`,
        {
          withCredentials: true,
        }
      );

      
      
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sortedOrders);
      setError("");
    } catch (err) {
      const status = err?.response?.status;
      const statusText = err?.response?.statusText;

      if (status === 401 && statusText === "Unauthorized") {
        const refreshed = await refreshToken();
        if (refreshed) {
          return fetchOrders(); // Retry after refresh
        } else {
          setError("Session expired. Please log in again.");
        }
      } else {
        console.error(err);
        setError("Failed to load orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        🛒 Your Orders
      </h2>

      {loading && (
        <p className="text-center text-blue-500 font-medium">Loading orders...</p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {!loading && Array.isArray(orders) && orders.length === 0 && (
        <p className="text-center text-gray-600">No orders found.</p>
      )}


      <div className="space-y-6  md:m-20 md:mt-0 ">
        {Array.isArray(orders) &&
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-500 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
            >
              <div className="mb-4 flex items-center justify-between">

                <div
                  className={`text-sm flex justify-center items-center font-semibold ${order.status === 'Delivered'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                    }`}
                > {order.status === 'Delivered' ?
                  <FaCheckCircle className="inline-block mr-2" />
                  : <FaClock className="inline-block mr-2" />
                  }
                  {order.status}
                </div>
              </div>

              <p className="mb-2">
                <strong>Order ID : </strong>{' '}
                <span className="text-gray-800">#{order.orderId}</span>
              </p>

              <p className="mb-2">
                <strong>Payment Method : </strong>{' '}
                <span className="text-gray-700">{order.paymentMethod}</span>
              </p>

              <p className="mb-2 ">
                <strong>Total Payable Amount : </strong>{' '}
                <span className="text-green-600 font-semibold">
                  ₹{order.order_amount}
                </span>
              </p>
              <div className="text-sm text-gray-600 border-b border-black pb-3">

                Ordered on :{' '}
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="parnt flex justify-between gap-4 md:items-end md:flex-row flex-col ">

                <div className="mt-2">
                  <strong>Items : </strong>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {order.orderItems?.map((item, i) => (
                      <li key={i}>
                        {item.name} x{' '}
                        <span className="font-semibold">{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`track ${order.status==="Shipped"?'flex':'hidden'} justify-start`}>
                  <a href={`${order.tracking_link}`} target="_blank">
                    <Button  className='bg-lime-500 text-black text-base'>Track Order</Button>

                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserOrders;
