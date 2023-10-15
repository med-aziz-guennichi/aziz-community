"use client";
import { Button, useDisclosure } from "@chakra-ui/react";
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
interface Props {
  name: string;
  username: string;
  id: string;
  likesLength: number;
  imgUrl: string;
}
const UserLikes = ({ name, username, id, likesLength, imgUrl }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <p hidden className="cursor-pointer" onClick={onOpen}>
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
            <UserCard
              id={id}
              name={name}
              username={username}
              imgUrl={imgUrl}
              personType={"User"}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserLikes;
