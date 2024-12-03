import ProductsContainer from "@/components/products/ProductsContainer";

async function AllBooks({
  searchParams,
}: // search,
{
  searchParams: { layout?: string };
}) {
  const layout = searchParams.layout || "grid";
  // const search = searchParams.search || "";
  return (
    <>
      {/* <ProductsContainer layout={layout} search={search} /> */}
      <ProductsContainer layout={layout} search="" />
    </>
  );
}
export default AllBooks;
