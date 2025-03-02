"use client"
import { useContext } from "react";
import CartContext from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border p-2 flex justify-between">
              <p>{item.name}</p>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                className="w-12 text-center"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
