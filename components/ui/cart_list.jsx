import React, { useEffect, useState } from 'react';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {cartItems.map((item, index) => (
        <div key={item.productId + item.variantSku} className="flex items-center gap-3 border-b py-4 relative">
          <div className="w-14 h-14 relative shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded"
            />
            <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {item.quantity}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">{item.company} • {item.size}</p>
          </div>
          <div className="text-sm font-semibold whitespace-nowrap">₹{item.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
