import { useCart } from "@/app/context/CartContext"; // Use the CartContext
import { Button } from "../ui/button";
import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";

const CartButton = () => {
  const { numItems } = useCart(); // Get the cart item count from context

  return (
    <Button
      asChild
      variant={"outline"}
      size={"icon"}
      className="flex justify-center items-center relative"
    >
      <Link href={"/cart"}>
        <LucideShoppingCart />
        {numItems > 0 && (
          <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
            {numItems}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartButton;
