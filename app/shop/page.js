"use client"


import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="border p-2 flex justify-between items-center">
            <p>{item.p_name} - ${item.p_price}</p>
            <div className="flex items-center">
              <button onClick={() => decrementQuantity(item.id)} className="p-2 border">-</button>
              <span className="mx-2">{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.id)} className="p-2 border">+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="p-2 bg-red-500 text-white">Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;

