"use client";
import Lotti from "lottie-react";
import NotFound from "@/animations/notfound.json";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center md:items-center xs:items-center w-full h-full">
      <Lotti animationData={NotFound} loop />
    </main>
  );
};

export default NotFoundPage;
