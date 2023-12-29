import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const GoogleAuth = () => {
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
        <Image src="./google.png" alt="Google logo" w={5}></Image>
        <Text color={"blue.500"} mx={2}>
          Log In with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
