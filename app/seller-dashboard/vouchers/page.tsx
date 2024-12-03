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
import { fetchVouchersBySellerId } from "@/utils/actions";

function Vouchers() {
  const [items, setItems] = useState<any[]>([]); // Ensuring items is an array
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVouchers = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        setError("Seller ID not found in local storage.");
        return;
      }

      try {
        const data = await fetchVouchersBySellerId(sellerId); // Use the action function
        setItems(data || []); // Default to empty array if no data
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchVouchers(); // Initial fetch on component mount
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedVoucherId) return;

    try {
      const response = await fetch(
        `http://localhost:4000/voucher/${selectedVoucherId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete voucher");
      }

      const result = await response.json();
      toast({ description: result.message });

      const sellerId = localStorage.getItem("sellerId");
      console.log("seller id is", sellerId);

      if (sellerId) {
        const data = await fetchVouchersBySellerId(sellerId); // Re-fetch after deletion
        setItems(data || []); // Default to empty array if no data
      }

      setIsModalOpen(false);
      setSelectedVoucherId(null);
    } catch (error: any) {
      toast({ description: error.message });
    }
  };

  const openModal = (voucherId: string) => {
    setSelectedVoucherId(voucherId);
    setIsModalOpen(true);
  };

  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total vouchers: {items ? items.length : 0}{" "}
          {/* Ensure items is not null */}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Is active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const {
              id: voucherId,
              code,
              discount,
              expiration,
              isActive,
            } = item;
            return (
              <TableRow key={voucherId}>
                <TableCell>{code}</TableCell>
                <TableCell>{discount}</TableCell>
                <TableCell>{expiration}</TableCell>
                <TableCell>{isActive}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <button
                    onClick={() => openModal(voucherId)}
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
        message="Are you sure you want to delete this voucher?"
      />
    </section>
  );
}

export default Vouchers;
