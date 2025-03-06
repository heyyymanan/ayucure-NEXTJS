"use client"



import { createContext, useState, useContext, useEffect } from "react";







const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart or increase quantity
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Increment quantity
  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity
  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // **Clear entire cart**
  const clearCart = () => {
    setCart([]); // Empty cart
    localStorage.removeItem("cart"); // Remove from local storage
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.p_price * item.quantity, 0);
  };
  

  return (
    <CartContext.Provider
      value={{ cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart
export const useCart = () => useContext(CartContext);
