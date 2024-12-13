import ProductsContainer from "@/components/products/ProductsContainer";

async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string };
}) {
  // Ensure the `searchParams` is awaited properly
  const params = await searchParams; // Awaiting the searchParams object
  const layout = params?.layout || "grid";

  return (
    <>
      <ProductsContainer layout={layout} search="" />
    </>
  );
}

export default ProductsPage;
