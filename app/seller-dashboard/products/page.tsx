"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import ConfirmModal from "@/components/ConfirmPopup/confirm-popup";
import { toast } from "@/hooks/use-toast";
import { fetchBooksBySellerId } from "@/utils/actions";

function SellerProducts() {
  const [items, setItems] = useState<any[]>([]); // Ensuring items is an array
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        setError("Seller ID not found in local storage.");
        return;
      }

      try {
        const data = await fetchBooksBySellerId(sellerId); // Use the action function
        setItems(data || []); // Default to empty array if no data
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProducts(); // Initial fetch on component mount
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedProductId) return;

    try {
      const response = await fetch(
        `http://localhost:4000/book/${selectedProductId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const result = await response.json();
      toast({ description: result.message });

      const sellerId = localStorage.getItem("sellerId");
      console.log("seller id is", sellerId);

      if (sellerId) {
        const data = await fetchBooksBySellerId(sellerId); // Re-fetch after deletion
        setItems(data || []); // Default to empty array if no data
      }

      setIsModalOpen(false);
      setSelectedProductId(null);
    } catch (error: any) {
      toast({ description: error.message });
    }
  };

  const openModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total products: {items ? items.length : 0}{" "}
          {/* Ensure items is not null */}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Book Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, title, author, price } = item;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/seller-dashboard/products/${productId}/view`}
                    className="underline text-muted-foreground tracking-wide capitalize"
                  >
                    {title}
                  </Link>
                </TableCell>
                <TableCell>{author}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`/seller-dashboard/products/${productId}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => openModal(productId)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product?"
      />
    </section>
  );
}

export default SellerProducts;
