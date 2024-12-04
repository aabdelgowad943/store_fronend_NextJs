"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCartData as fetchData } from "@/utils/actions";
import { Cart } from "@/utils/types";

type CartContextType = {
  cartItems: Cart[];
  totalPrice: number;
  numItems: number;
  fetchCart: (userId: string) => Promise<void>;
  removeItemFromCart: (id: string) => void;
  setCartItems: (items: Cart[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fetch cart from localStorage or initialize as empty
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Calculate total price whenever cartItems change
  useEffect(() => {
    const calculateTotalPrice = (items: Cart[]) => {
      const total = items.reduce(
        (sum, item) => sum + item.book.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice(cartItems);

    // Persist cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch the user's cart from API
  const fetchCart = async (userId: string) => {
    try {
      const data = await fetchData(userId);
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }
  };

  // Remove an item from the cart and update both the state and localStorage
  const removeItemFromCart = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);

    // Update the cartItems state immediately
    setCartItems(updatedItems);

    // Persist the updated cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Calculate the total number of items in the cart
  const numItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        numItems,
        fetchCart,
        removeItemFromCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
