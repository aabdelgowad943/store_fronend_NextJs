// import { fetchFeaturedProducts } from "@/utils/actions";
// import EmptyList from "../global/EmptyList";
// import SectionTitle from "../global/SectionTitle";
// import ProductsGrid from "../products/ProductsGrid";

// async function FeaturedProduct() {
//   const product = await fetchFeaturedProducts();
//   if (product.length === 0) return <EmptyList />;

//   return (
//     <section className="mt-24 md:px-5">
//       <SectionTitle text="Featured products" />
//       <ProductsGrid products={product} />
//     </section>
//   );
// }

// export default FeaturedProduct;

import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProduct() {
  let product = [];

  try {
    product = await fetchFeaturedProducts();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    // Fallback: Show a message instead of crashing
    return (
      <section className="mt-24 md:px-5">
        <SectionTitle text="Featured Products" />
        <p className="text-center text-gray-500">
          Failed to load products. Please try again later.
        </p>
      </section>
    );
  }

  if (product.length === 0) return <EmptyList />;

  return (
    <section className="mt-24 md:px-5">
      <SectionTitle text="Featured products" />
      <ProductsGrid products={product} />
    </section>
  );
}

export default FeaturedProduct;
