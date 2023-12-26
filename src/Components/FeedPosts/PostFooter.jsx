import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assest/Constants";

//This Component renders the post footer.

const PostFooter = ({ userName }) => {
  // useState for liked post
  const [liked, setLiked] = useState(false);
  //useState for number of likes
  const [likes, setLikes] = useState(1000);
  const handleLiked = () => {
    // if like is ture set the liked to false and decerease the number of likes, else set ture and increase the number of likes.
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };
  return (
    <Box mb={10}>
      <Flex alignItems={"center"} w={"full"} p={0} mb={2} mt={4} gap={4}>
        {/* onClick on the like button to like and unlike the post */}
        <Box onClick={handleLiked} cursor={"pointer"} fontSize={18}>
          {/* the NotificationsLogo is the filled like logo  */}
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      <Text fontSize={"sm"} fontWeight={700}>
        {userName}
        {/* The as tag makes the Text tag to span, if we do not use the as attribute the text tag will act as a praragraph. */}
        <Text as={"span"} fontWeight={400}>
          {" "}
          Alhumdulliah for everything!!
        </Text>
      </Text>
      <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
        View all 1,000 comments
      </Text>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"full"}
        gap={2}
      >
        {/* InputGroup is the chakra ui element */}
        <InputGroup>
          <Input
            variant={"flushed"}
            placeholder="Add a comment...."
            fontSize={14}
          ></Input>
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
