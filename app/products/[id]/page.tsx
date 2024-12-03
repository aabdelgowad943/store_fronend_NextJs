import { fetchSingleProduct } from "@/utils/actions";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import BreadCrumbs from "@/components/single-products/BreadCrumbs";
import ProductRating from "@/components/single-products/ProductRating";
import AddToCart from "@/components/single-products/AddToCart";
import Link from "next/link";

async function SingleProductPage({
  params,
}: {
  params: { id: string; isFeatured: boolean };
}) {
  const product = await fetchSingleProduct(params.id);
  const { title, fileUrl, author, description, price, seller, vouchers } =
    product;
  // const realAmount = formatCurrency(price);
  // const dollarsAmount = formatCurrency(price * (1 - vouchers[0].discount));

  const realAmount = formatCurrency(price);

  const hasVoucher = vouchers && vouchers.length > 0;
  const dollarsAmount = hasVoucher
    ? formatCurrency(price * (1 - vouchers[0].discount))
    : realAmount; // Use original price if no voucher is available
  const voucherText = hasVoucher ? vouchers[0].code : "No Voucher Available";

  return (
    <section>
      <BreadCrumbs title={product.title} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={fileUrl}
            alt={title}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{title}</h1>
            <FavoriteToggleButton isFeatured productId={params.id} />
          </div>
          <ProductRating productId={params.id} />
          <h4 className="text-xl mt-2">
            Seller:{" "}
            <Link href={`/profile/${seller.username}`}>
              <span className="cursor-pointer text-blue-800">
                {seller.username}
              </span>
            </Link>
          </h4>
          <h4 className="text-xl mt-2">Author: {author}</h4>
          <h4 className="text-xl mt-2"> Voucher code: {voucherText}</h4>{" "}
          <div className="flex flex-col w-fit">
            <p
              className={`mt-3 text-md inline-block p-2 rounded-md ${
                hasVoucher
                  ? "line-through bg-gray-200 dark:bg-black dark:border"
                  : "bg-muted"
              }`}
            >
              {realAmount}
            </p>

            {/* Display Discounted Price */}
            {hasVoucher && (
              <p className="mt-3 text-md bg-green-200 dark:bg-black dark:border  inline-block p-2 rounded-md">
                {dollarsAmount}
              </p>
            )}
          </div>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart bookId={params.id} />
        </div>
      </div>
    </section>
  );
}
export default SingleProductPage;
