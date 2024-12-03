import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer/page";
import { CartProvider } from "./context/CartContext";
import Login from "./auth/login/page";
import { UserProvider } from "./context/UserContext";

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
    // <ClerkProvider>
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
    // </ClerkProvider>
  );
}
