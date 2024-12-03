"use client";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import CheckboxInput from "@/components/form/CheckBoxInput";
import { createProductAction } from "@/utils/actions";
import { useEffect, useState } from "react";

function CreateProduct() {
  const [sellerId, setSellerId] = useState<string | null>(null);
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  useEffect(() => {
    // Retrieve sellerId only on the client side
    const storedSellerId = localStorage.getItem("sellerId");
    setSellerId(storedSellerId);
  }, []);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    if (!sellerId) {
      // Return a resolved Promise with a default message
      return Promise.resolve({
        message: "Seller ID is missing. Please log in again.",
      });
    }

    // Forward the form submission to createProductAction
    return createProductAction(prevState, formData, sellerId);
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={handleFormSubmit}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="title"
              placeholder="book name"
              label="book name"
              defaultValue="test book name"
            />
            <FormInput
              type="text"
              name="author"
              placeholder="ahmed mamdouh"
              label="author"
              defaultValue="test author name"
            />
            <PriceInput name="price" />
            <FormInput
              type="text"
              name="fileUrl"
              placeholder="insert image link"
              label="image url"
              defaultValue="https://via.placeholder.com/150"
            />

            {/* <ImageInput /> */}
          </div>
          <TextAreaInput
            name="description"
            labelText=" description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="isFeatured" label="featured" />
          </div>

          <SubmitButton text="Create Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProduct;
