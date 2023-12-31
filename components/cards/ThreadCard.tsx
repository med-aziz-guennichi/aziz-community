import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import { AddLikeOrDislikeToThread } from "@/lib/actions/thread.actions";
import Like from "../forms/Like";
import UserLikes from "./UserLikes";
import { ChakraProvider } from "@chakra-ui/react";
import Share from "../forms/Share";
import LikesCard from "./LikesCard";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  photo: string;
  file: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  likes: [any];
  sharedFrom: any;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  userLogged: {
    _id: string;
  };
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  userLogged,
  likes,
  sharedFrom,
  photo,
  file,
}: Props) {
  const likess = likes.map((like) => {
    return {
      id: like._id,
      name: like.name,
      username: like.username,
      image: like.image,
    };
  });
  return (
    <ChakraProvider>
      <article
        className={`flex w-full flex-col rounded-xl ${
          isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
        }`}
      >
        {sharedFrom && (
          <Link
            className="flex items-center mb-3"
            href={`/profile/${sharedFrom._id}`}
          >
            <p className=" flex items-center text-subtle-medium text-gray-1">
              Shared from{" "}
              <p className="text-light-1 pl-1">
                {sharedFrom.name} @{sharedFrom.username}
              </p>
            </p>
          </Link>
        )}
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  src={author.image}
                  alt="user_community_image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>

              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>

              <p className="mt-2 text-small-regular text-light-2">{content}</p>
              {photo && (
                <div className="mt-5">
                  <Link href={photo} rel="noreferrer">
                    <Image
                      src={photo}
                      alt="user_post_image"
                      width={400}
                      className="object-cover cursor-pointer hover:scale-105 transition"
                      height={400}
                    />
                  </Link>
                </div>
              )}
              {file && (
                <div className="mt-5">
                  <a
                    className="text-light-3 text-tiny-medium hover:underline"
                    href={file}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file}
                  </a>
                </div>
              )}
              <div
                className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}
              >
                <div className="flex gap-3.5">
                  <Like
                    currentUserId={userLogged._id.toString()}
                    id={id}
                    key={id}
                    isLiked={likes.some(
                      (like) =>
                        like._id.toString() === userLogged._id.toString()
                    )}
                  />
                  <Link href={`/thread/${id}`}>
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  <Share key={id} postId={id} currentUserId={currentUserId} />
                  {/* <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  /> */}
                </div>
                <div className="text-subtle-medium text-gray-1">
                  {likes.length > 0 && (
                    <LikesCard likesLength={likes.length} likes={likess} />
                  )}
                  {likes.length > 0 ? (
                    likes.map((like, index) => (
                      <UserLikes
                        key={index}
                        likesLength={likes.length}
                        name={like.name}
                        username={like.username}
                        imgUrl={like.image}
                        id={like.id}
                      />
                    ))
                  ) : (
                    <p className="text-subtle-medium text-gray-1">
                      No likes yet
                    </p>
                  )}
                </div>
                {isComment && comments.length > 0 && (
                  <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
        </div>

        {!isComment && comments.length > 0 && (
          <div className="ml-1 mt-3 flex items-center gap-2">
            {comments.slice(0, 2).map((comment, index) => (
              <Image
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                width={24}
                height={24}
                className={`${
                  index !== 0 && "-ml-5"
                } rounded-full object-cover`}
              />
            ))}

            <Link href={`/thread/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">
                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
              </p>
            </Link>
          </div>
        )}
        {!isComment && !community && (
          <p className="mt-5 flex items-center text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
          </p>
        )}
        {!isComment && community && (
          <Link
            href={`/communities/${community.id}`}
            className="mt-5 flex items-center"
          >
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)}
              {community && ` - ${community.name} Community`}
            </p>

            <Image
              src={community.image}
              alt={community.name}
              width={14}
              height={14}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
      </article>
    </ChakraProvider>
  );
}

export default ThreadCard;
