"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createVoucherAction, fetchBooksBySellerId } from "@/utils/actions";

function CreateVoucher() {
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [books, setBooks] = useState<{ id: string; title: string }[]>([]);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
  const [bookError, setBookError] = useState<string | null>(null);

  useEffect(() => {
    const storedSellerId = localStorage.getItem("sellerId");
    setSellerId(storedSellerId);

    if (storedSellerId) {
      fetchBooksBySellerId(storedSellerId)
        .then((fetchedBooks) => {
          setBooks(fetchedBooks || []);
          setLoadingBooks(false);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setBookError("Failed to fetch books. Please try again later.");
          setLoadingBooks(false);
        });
    }
  }, []);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    if (!sellerId) {
      return Promise.resolve({
        message: "Seller ID is missing. Please log in again.",
      });
    }

    return createVoucherAction(prevState, formData, sellerId);
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Create Voucher</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={handleFormSubmit}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="code"
              placeholder="code12doc"
              label="Voucher Code"
            />
            {loadingBooks ? (
              <p>Loading books...</p>
            ) : bookError ? (
              <p className="text-red-500">{bookError}</p>
            ) : (
              <div>
                <label htmlFor="bookId" className="block font-medium">
                  Book
                </label>
                <select
                  name="bookId"
                  id="bookId"
                  className="block w-full border p-2 rounded-md"
                >
                  <option value="" disabled>
                    Select a book
                  </option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <FormInput
              type="number"
              step="0.2"
              name="discount"
              placeholder="0.2"
              label="Discount (0-1)"
            />
            <FormInput type="date" name="expiration" label="Expiration Date" />
          </div>
          <SubmitButton text="Create Voucher" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateVoucher;
