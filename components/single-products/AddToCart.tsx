"use client";
import { Button } from "../ui/button";
import { addToCart } from "@/utils/actions";
import { useCart } from "@/app/context/CartContext"; // Use CartContext
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

function AddToCart({ bookId }: { bookId: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const { fetchCart } = useCart(); // Fetch cart to refresh context

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleAddToCart = async () => {
    if (!userId) {
      toast({ description: "User is not logged in" });
      return;
    }

    const quantity = 1;

    try {
      const response = await addToCart(userId, bookId, quantity);

      if (response && response.success) {
        toast({ description: "Product added to cart" });
        await fetchCart(userId); // Refresh cart data in context
      } else {
        toast({
          description: `Failed to add item to cart: ${response.message}`,
        });
      }
    } catch (error) {
      toast({ description: "An error occurred while adding to the cart." });
    }
  };

  return (
    <Button className="capitalize mt-8" size={"lg"} onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
}

export default AddToCart;
