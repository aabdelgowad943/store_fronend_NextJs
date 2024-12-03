"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCartData as fetchData,
  removeItemFromCart as removeFromCart,
} from "@/utils/actions";
import { Cart } from "@/utils/types";

type CartContextType = {
  cartItems: Cart[];
  totalPrice: number;
  numItems: number;
  fetchCart: (userId: string) => Promise<void>; // Modify to accept userId
  removeItemFromCart: (id: string) => Promise<boolean>;
  setCartItems: (items: Cart[]) => void; // Expose setCartItems to handle quantity changes
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Recalculate total price whenever cartItems are updated
  useEffect(() => {
    const calculateTotalPrice = (items: Cart[]) => {
      const total = items.reduce(
        (sum, item) => sum + item.book.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  const fetchCart = async (userId: string) => {
    // Accept userId as an argument
    try {
      const data = await fetchData(userId); // Pass userId to the fetch function
      setCartItems(data); // Set the fetched cart data
    } catch (error) {
      // console.error("Failed to fetch cart data", error);
      // Optional: Add a toast notification for errors here
    }
  };

  const removeItemFromCart = async (id: string): Promise<boolean> => {
    try {
      const success = await removeFromCart(id);
      if (success) {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
      }
      return success;
    } catch (error) {
      // console.error("Failed to remove item", error);
      return false;
    }
  };

  const numItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        numItems,
        fetchCart,
        removeItemFromCart,
        setCartItems, // Expose setCartItems for external use
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
