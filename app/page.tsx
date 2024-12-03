import LoadingContainer from "@/components/global/LoadingContainer";
import AllBooks from "@/components/home/AllBooks";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import React, { Suspense } from "react";

function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProduct />
      </Suspense>
      <Testimonials />
      <AllBooks searchParams />
    </>
  );
}

export default HomePage;
