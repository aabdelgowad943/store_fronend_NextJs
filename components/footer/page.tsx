"use client";
import Logo from "@/components/navbar/Logo";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  // Check if the URL contains "dashboard" or "user-dashboard"
  const shouldHideFooter =
    pathname.includes("admin") ||
    pathname.includes("seller-dashboard") ||
    pathname.includes("auth");

  // If the condition is met, don't render the footer
  if (shouldHideFooter) return null;
  return (
    <footer className="p-4 border md:p-8 lg:p-10 ">
      <div className="mx-auto max-w-screen-xl text-center">
        <Logo />

        <p className="my-6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio
          modi, labore ea ratione in eius beatae autem nemo dolore voluptatibus!
          Consequuntur nobis ut error ex nihil? Deserunt, facere maiores!
        </p>

        <span className="text-sm ">
          © 2021-2022{" "}
          <a href="#" className="hover:underline">
            PDF_BOOK_STORE™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
