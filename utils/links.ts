type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/cart", label: "cart" },
  { href: "/admin/sellers", label: "dashboard" },
  { href: "/seller-dashboard/products", label: "seller" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sellers", label: "sellers" },
  { href: "/admin/sellers/create", label: "Add seller" },
];
export const sellerLinks: NavLink[] = [
  { href: "/seller-dashboard/products", label: "my products" },
  { href: "/seller-dashboard/products/create", label: "create product" },
  { href: "/seller-dashboard/statistics", label: "statistics" },
  { href: "/seller-dashboard/vouchers", label: "vouchers" },
  { href: "/seller-dashboard/vouchers/create", label: "create voucher" },
];
