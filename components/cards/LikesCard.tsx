"use client";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UserCard from "./UserCard";

const LikesCard = ({ likesLength, likes }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <p onClick={onOpen} className="cursor-pointer">
        {likesLength} likes
      </p>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bg={"gray.700"} color={"white"}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {likes.map((like: any) => (
              <UserCard
                key={like._id}
                id={like._id}
                name={like.name}
                username={like.username}
                imgUrl={like.image}
                personType={"User"}
              />
            ))}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LikesCard;
