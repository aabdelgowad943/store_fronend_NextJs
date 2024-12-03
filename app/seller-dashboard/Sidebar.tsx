"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { sellerLinks } from "@/utils/links";

function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside>
        {sellerLinks.map((link) => {
          const isActivePage = pathname === link.href;
          const variant = isActivePage ? "default" : "ghost";
          return (
            <Button
              key={link.href}
              asChild
              className="w-full mb-2 capitalize font-normal justify-start"
              variant={variant}
            >
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            </Button>
          );
        })}
      </aside>
    </>
  );
}
export default Sidebar;
