import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

// posts component with modal overlay and also modal which shows the post, likes and comments

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* modal opens when the user clicks the grid item */}
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease-in-out"}
          zIndex={1}
          justifyContent={"center"}
        >
          {/* this flex show the overlay of likes and comments the overlay is displayed over the image */}
          <Flex alignItems={"center"} justifyContent={"center"} gap={"50px"}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                10
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={img}
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          alt="Profile Posts"
        />
      </GridItem>

      {/*this modal is a Chakra UI component the modal will be display when the user clicks the post image */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "70%", sm: "90%", md: "full" }}
              mx={"auto"}
            >
              <Box
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                borderRadius={4}
                overflow={"hidden"}
                flex={1.5}
              >
                <Image src={img} alt="profile post"></Image>
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={2}>
                    <Avatar
                      src="./Profile Image.jpeg"
                      size={"sm"}
                      name="faisal suleman"
                    ></Avatar>
                    <Text fontSize={12} fontWeight={"bold"}>
                      Faisal_suleman
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red.700" }}
                    borderRadius={4}
                    padding={1}
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Box>
                </Flex>
                {/* divider, this will display a line dividing flex and the stack */}
                <Divider my={4} bg={"gray.500"} />

                {/* overflowY auto displays the scrollbar when the content inside the stack execeds the given height */}
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* comment component */}
                  <Comment
                    username={"faisal"}
                    createdAt={"1d ago."}
                    profilePic={"./profilepic.png"}
                    text={"dummy image from unsplash"}
                  />
                  <Comment
                    username={"Natasha"}
                    createdAt={"1d ago."}
                    profilePic={"./img3.png"}
                    text={"nice pic!!"}
                  />
                  <Comment
                    username={"Bravo"}
                    createdAt={"1d ago."}
                    profilePic={"./img2.png"}
                    text={"nice clone dude"}
                  />
                </VStack>

                <Divider my={4} bg={"gray.800"} />
                {/* component reused */}
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
