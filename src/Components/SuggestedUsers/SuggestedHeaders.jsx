import { Avatar, Text, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedHeaders = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar
          name="Faisal_Suleman"
          src="./Profile Image.jpeg"
          size={"sm"}
        ></Avatar>
        <Text fontSize={12} fontWeight={"bold"}>
          Faisal_suleman
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        style={{ textDecoration: "none" }}
        cursor={"pointer"}
      >
        Log out
      </Link>
    </Flex>
  );
};

export default SuggestedHeaders;
