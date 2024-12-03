"use client";

import { fetchSellers } from "@/utils/actions";
import { User } from "@/utils/types";
import { useEffect, useState } from "react";

const Sellers = () => {
  const [sellers, setSellers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSellers = async () => {
      try {
        const data = await fetchSellers();
        setSellers(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getSellers();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="pt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sellers.map((seller) => (
        <div
          key={seller.id}
          className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col items-center">
            {seller.profileImage ? (
              <img
                src={seller.profileImage}
                alt={seller.username}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <h3 className="text-lg font-semibold capitalize">
              {seller.username}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{seller.email}</p>
            {seller.bio && <p className="text-gray-500 mt-2">{seller.bio}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sellers;
