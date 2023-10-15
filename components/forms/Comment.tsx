"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { useState } from "react";
import Loading from "@/animations/button-loading.json";
import Lotti from "lottie-react";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setLoading(true);
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    setLoading(false);
    form.reset();
  };
  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {loading ? (
          <div className="w-[70px]">
            <Lotti animationData={Loading} />
          </div>
        ) : (
          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        )}
      </form>
    </Form>
  );
};

export default Comment;
