import {
  Avatar,
  Box,
  Button,
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
import React, { useRef, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/useUserProfileStore";
import usePostStore from "../../store/usePostStore";
import useShowToast from "../../hooks/useShowToast";
import useauthStore from "../../store/authStore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Caption from "../Comment/Caption";

// posts component with modal overlay and also modal which shows the post, likes and comments

const ProfilePost = ({ post }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useauthStore((state) => state.user);
  const deletePost = usePostStore((state) => state.deletePost);

  const decrementPostCounter = useUserProfileStore(state => state.deletePost)

  const [isDeleting, setIsDeleting] = useState(false);
  const showToast = useShowToast();

  const handleDeletePost = async () => {
    // this will pop up an confirmation message passed into the confirm() if the user clicks cancel we will return out of the function
    if (!window.confirm("Are you sure you want to delete the post!!")) return;
    if (isDeleting) return;
    try {
      // First we are going to delete the Image from the storage->post
      //then we will delete the post from the posts collection
      //then we will delete the post which is in the users collection

      const imageRef = ref(storage, `posts/${post.id}`);
      //this will be the image we want to delete from the storage
      await deleteObject(imageRef);

      //this userRef will be used to update the users collection
      const userRef = doc(firestore, "users", authUser.uid);

      //deleting the post from the posts collection
      await deleteDoc(doc(firestore, "posts", post.id));

      //deleteing the post from the post array which is in the users collection
      await updateDoc(userRef, {
        post: arrayRemove(post.id),
      });

      //this will update the global post state and delete the post from the proile
      deletePost(post.id);
      //update the profile state and also update the post count
      decrementPostCounter(post.id)

      showToast("Success", "Post Deleted Successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

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
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageUrl}
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
                <Image src={post.imageUrl} alt="profile post"></Image>
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
                      src={userProfile.profilePicUrl}
                      size={"sm"}
                      name="faisal suleman"
                    ></Avatar>
                    <Text fontSize={12} fontWeight={"bold"}>
                      {userProfile.userName}
                    </Text>
                  </Flex>
                  {/* delete button */}
                  {authUser?.uid === userProfile.uid && (
                    <Button
                      _hover={{ bg: "whiteAlpha.300", color: "red.700" }}
                      borderRadius={4}
                      padding={1}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor="pointer" />
                    </Button>
                  )}
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
                  {/* Caption component */}

                  {post.caption && <Caption post={post} />}

                  {/* comment component */}
                  {/* mappin over the comments array in the post  */}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>

                <Divider my={4} bg={"gray.800"} />
                {/* component reused */}
                {/* postfooter component */}
                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
