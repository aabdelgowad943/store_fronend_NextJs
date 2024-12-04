"use client";
import React, { Suspense } from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { usePathname } from "next/navigation";
import Search from "./TestSearch";
// import UserIcon from "./UserIcon";
function Navbar() {
  const pathname = usePathname();
  // Check if the URL contains "dashboard" or "user-dashboard"
  const shouldHideFooter =
    pathname.includes("auth/login") || pathname.includes("auth/register");

  // If the condition is met, don't render the footer
  if (shouldHideFooter) return null;

  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        <Suspense>
          <NavSearch />
          {/* <Search /> */}
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
          {/* <UserIcon /> */}
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
