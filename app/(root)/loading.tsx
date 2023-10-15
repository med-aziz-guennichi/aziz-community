"use client";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import Load from "@/animations/animation_lnrvvjg6.json";
import Lotti from "lottie-react";

const loading = () => {
  return (
    <ChakraProvider>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 backdrop-blur-md backdrop-filter bg-opacity-50"></div>
        {/* <Spinner color="red.500" speed="0.65s" /> */}
        <Lotti animationData={Load} />
      </div>
    </ChakraProvider>
  );
};

export default loading;
