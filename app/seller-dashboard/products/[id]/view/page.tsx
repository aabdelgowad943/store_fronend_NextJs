"use client";

import { getProductById } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewProduct = () => {
  const { id } = useParams(); // Access the `id` from dynamic routing
  const [product, setProduct] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("productId:", id); // Debugging log

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const productData = await getProductById(id); // Fetch product by ID
        setProduct(productData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-500">
          No product found
        </div>
      </div>
    );
  }

  const dollarsAmount = `$${product.price.toFixed(2)}`;

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-1 lg:grid-cols-1 justify-center items-center">
      <article className="group relative">
        <Link href={`/admin/products/${product.id}/view`}>
          <div className="transform group-hover:shadow-xl transition-shadow duration-500 bg-white rounded-lg overflow-hidden">
            <div className="relative h-64 md:h-96 rounded overflow-hidden">
              <Image
                src={product.fileUrl}
                alt={product.title}
                fill
                sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                priority
                className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold capitalize">{product.title}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-muted-foreground mt-4 text-lg">
                {product.author}
              </p>
              <p className="text-muted-foreground mt-4 text-lg">
                {dollarsAmount}
              </p>
            </div>
          </div>
        </Link>
        <div className="absolute top-7 right-7 z-5">
          {/* Replace this placeholder with a FavoriteToggleButton if required */}
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            ♥
          </button>
        </div>
      </article>
    </div>
  );
};

export default ViewProduct;
