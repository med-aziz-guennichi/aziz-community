"use client";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { republideThread } from "@/lib/actions/thread.actions";
interface Props {
  postId: string;
  currentUserId: string;
}
const Share = ({ postId, currentUserId }: Props) => {
  const handleClick = async () => {
    await republideThread(postId, currentUserId, "/");
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Image
            src="/assets/repost.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-dark-4 text-light-2">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to republish this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to republish this post? Click 'Confirm' to
              update its timestamp and reach a wider audience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-dark-2">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>Publish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Share;
