import {
  Box,
  VStack,
  Image,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AuthForm = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="./logo.png" h={24} alt="Instagram"></Image>
          <Input placeholder="Email" fontSize={14} type="Email"></Input>
          <Input placeholder="Password" fontSize={14} type="password"></Input>

          {!isLogin ? (
            <Input
              placeholder="Confirm Password"
              fontSize={14}
              type="password"
            ></Input>
          ) : null}
          <Button w={"full"} colorScheme="blue" fontSize={14} size={"sm"}>
            {isLogin ? " Log In" : "Sign up"}
          </Button>

          {/* -------------- OR ----------------- */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
            <Text color={"white"} mx={1}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
          </Flex>

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Image src="./google.png" alt="Google logo" w={5}></Image>
            <Text color={"blue.500"} mx={2}>
              Log In with Google
            </Text>
          </Flex>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account" : "Already have an account"}
          </Box>
          <Box
            onClick={() => setLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
