"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { FileUpload } from "../shared/file-upload";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      image: "",
      file: "",
      accountId: userId,
    },
  });
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setLoading(true);
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        values.image = imgRes[0].url;
      }
    }
    await createThread({
      text: values.thread,
      image: values.image,
      file: values.file,
      author: userId,
      communityId: organization ? organization.id.toString() : null,
      path: pathname,
    });
    setLoading(false);
    router.push("/");
  };

  return (
    <ChakraProvider>
      <Form {...form}>
        <form
          className="mt-10 flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <>
                <FormItem className="flex w-full flex-col gap-3">
                  {field.value ? (
                    <Image
                      src={field.value}
                      width={1000}
                      height={1000}
                      alt="image"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile photo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload a profile photo"
                      className="account-form_image-input"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <>
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    <Image
                      src="/assets/tag.svg"
                      alt="tag photo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </FormLabel>
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <FileUpload
                      endpoint="files"
                      onChange={(url) => {
                        if (url) {
                          field.onChange(url);
                        }
                      }}
                    />
                  </FormControl>
                  {field.value && (
                    <FormMessage>
                      <a href={field.value} target="_blank" rel="noreferrer">
                        {field.value}
                      </a>
                    </FormMessage>
                  )}
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <>
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Content
                  </FormLabel>
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {loading ? (
            <Spinner speed="0.65s" />
          ) : (
            <Button type="submit" className="bg-primary-500">
              Post Thread
            </Button>
          )}
        </form>
      </Form>
    </ChakraProvider>
  );
}

export default PostThread;
