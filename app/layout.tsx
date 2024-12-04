import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import Footer from "@/components/footer/page";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import CartButton from "@/components/navbar/CartButton";

export const metadata: Metadata = {
  title: "Store frontend",
  description: "Generate to be a store for seller and books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <CartProvider>
            <Providers>
              <Navbar />
              <Container className="py-20">{children}</Container>
              <Footer />
            </Providers>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
