"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";

export default function Page() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      const fetchBooks = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/book/search?q=${searchValue}`
          );
          const data = await response.json();

          if (data.success && data.data && Array.isArray(data.data.data)) {
            setBooks(data.data.data); // Access data.data.data
          } else {
            console.error("No books found or unexpected data structure.");
          }
        } catch (error) {
          console.error("Error fetching books:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();
    }
  }, [searchValue]);

  return (
    <div>
      <h1 className="mb-3">Search Results for: {searchValue}</h1>
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <article key={book.id} className="group relative">
              <Link href={`/products/${book.id}`}>
                <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                  <CardContent className="p-4">
                    <div className="relative h-64 md:h-48 rounded overflow-hidden">
                      <Image
                        src={book.fileUrl}
                        alt={book.title}
                        fill
                        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                        priority
                        className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h2 className="text-lg capitalize">{book.title}</h2>
                      <p className="text-muted-foreground mt-2">
                        ${book.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <div className="absolute top-7 right-7 z-5">
                <FavoriteToggleButton
                  isFeatured={book.isFeatured}
                  productId={book.id}
                />
              </div>
            </article>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
