"use client";
import { Button } from "../ui/button";
import { addToCart } from "@/utils/actions";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

function AddToCart({ bookId }: { bookId: string }) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id); // Set userId from localStorage after the component mounts
  }, []); // Empty dependency array means this runs only once after the component mounts

  const handleAddToCart = async () => {
    if (!userId) {
      toast({ description: "User is not logged in" });
      // alert("User is not logged in");
      return;
    }

    const quantity = 1;
    // console.log("Adding to cart", { userId, bookId, quantity });

    try {
      // Make the request to add to cart
      const response = await addToCart(userId, bookId, quantity);
      // console.log("Add to cart response:", response);

      if (response && response.success) {
        toast({ description: "Product added to cart" });
        // alert("Product added to cart!");
      } else {
        toast({
          description: `Failed to add item to cart: ${response.message}`,
        });
        // alert(
        //   `Failed to add item to the cart: ${
        //     response?.message || "Unknown error"
        //   }`
        // );
      }
    } catch (error) {
      // console.error("Error adding to cart:", error);
      // alert("An error occurred while adding to the cart.");
      // alert("An error occurred while adding to the cart.");
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
