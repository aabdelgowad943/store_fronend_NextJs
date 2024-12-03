import React from "react";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";

type FavoriteToggleButtonProps = {
  isFeatured: boolean;
  productId: string;
};

function FavoriteToggleButton({ isFeatured }: FavoriteToggleButtonProps) {
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className={`p-2 cursor-pointer ${
        isFeatured
          ? "text-red-500 border-red-500 hover:bg-red-50"
          : "text-gray-500"
      }`}
    >
      <FaHeart />
    </Button>
  );
}

export default FavoriteToggleButton;
