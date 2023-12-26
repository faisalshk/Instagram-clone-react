import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { color } from "framer-motion";
import React from "react";

// this component renders the post header

const PostHeader = ({ userName, avatar }) => {
  return (
    <Flex
      justifyContent={"space-between"}
      w={"full"}
      alignItems={"center"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} alt="profile pic" size={"sm"}></Avatar>
        <Flex fontSize={12} fontWeight={"bold"} gap={"2"}>
          <Box>{userName}</Box>
          <Box color={"gray.500"}>. 1w</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          color={"blue.500"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
        >
          UnFollow
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
