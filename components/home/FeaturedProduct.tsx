import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProduct() {
  const product = await fetchFeaturedProducts();
  if (product.length === 0) return <EmptyList />;

  return (
    <section className="mt-24 md:px-5">
      <SectionTitle text="Featured products" />
      <ProductsGrid products={product} />
    </section>
  );
}

export default FeaturedProduct;
