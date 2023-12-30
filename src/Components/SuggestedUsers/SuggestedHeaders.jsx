import { Avatar, Text, Flex, Button } from "@chakra-ui/react";
import React from "react";
import useLogout from "../../hooks/useLogout";
import useauthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeaders = () => {
  const { handleLogout, isLoggingout } = useLogout();
  //getting he user data from the global user state
  const authUser = useauthStore((state) => state.user);

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.userName}`}>
          <Avatar src={authUser.profilePicUrl} size={"md"}></Avatar>
        </Link>
        <Link to={`${authUser.userName}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.userName}
          </Text>
        </Link>
      </Flex>
      <Button
        onClick={() => handleLogout()}
        size={"xs"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        background={"transparent"}
        _hover={{ bg: "transparent" }}
        cursor={"pointer"}
        isLoading={isLoggingout}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeaders;
