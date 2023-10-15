"use client";
import { AddLikeOrDislikeToThread } from "@/lib/actions/thread.actions";
import { log } from "console";
import Image from "next/image";

interface Props {
  id: string;
  currentUserId: string;
  isLiked: boolean;
}
const Like = ({ id, currentUserId, isLiked }: Props) => {
  const handleLikeOrDislike = async () => {
    const response = await AddLikeOrDislikeToThread(id, currentUserId, `/`);
    console.log(response);
  };
  return (
    <div>
      {isLiked ? (
        <Image
          onClick={handleLikeOrDislike}
          src="/assets/heart-filled.svg"
          alt="heart"
          width={24}
          height={24}
          className={`cursor-pointer object-contain`}
        />
      ) : (
        <Image
          onClick={handleLikeOrDislike}
          src="/assets/heart-gray.svg"
          alt="heart"
          width={24}
          height={24}
          className={`cursor-pointer object-contain`}
        />
      )}
    </div>
  );
};

export default Like;
