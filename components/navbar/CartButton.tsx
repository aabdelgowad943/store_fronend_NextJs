import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";
import { fetchCartData } from "@/utils/actions"; // Assuming fetchCartData is in utils/actions

const CartButton = () => {
  const [numItemsInCart, setNumItemsInCart] = useState<number>(0);

  useEffect(() => {
    const fetchUserCartData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve the userId from localStorage
        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

        const cartItems = await fetchCartData(userId); // Use fetchCartData with userId
        setNumItemsInCart(
          cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
        ); // Calculate total quantity
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };

    fetchUserCartData();
  }, []);

  return (
    <Button
      asChild
      variant={"outline"}
      size={"icon"}
      className="flex justify-center items-center relative"
    >
      <Link href={"/cart"}>
        <LucideShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numItemsInCart > 0 ? numItemsInCart : ""}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
