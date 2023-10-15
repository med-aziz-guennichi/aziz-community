"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ChakraProvider, useToast } from "@chakra-ui/react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const toast = useToast();
  return (
    <ChakraProvider>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }}
      />
    </ChakraProvider>
  );
};
