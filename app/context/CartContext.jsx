import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // Store cart items by product ID

  // Function to add a product to cart
  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] ? prevCart[productId] + 1 : 1, // Increase count or add new product
    }));
  };

  // Function to remove a product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart; // If not in cart, return same state

      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 1) updatedCart[productId] -= 1;
      else delete updatedCart[productId]; // Remove item if quantity reaches 0
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  return useContext(CartContext);
}
