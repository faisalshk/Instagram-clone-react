import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../Componrnts/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    // All of the Flex or Container are UI components from chakra
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxWidth={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left hand side */}
          {/* to make responsive element we use {{}} */}
          {/* base is smaller screen and above is none */}
          {/* md is medium screen and above display is block */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="Phone Image"></Image>
          </Box>
          {/* Right hand side */}
          {/* the vertical stack is like flex, it just stacks the element vertically  */}
          <VStack spacing={4}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="./microsoft.png" h={10} alt="Microsoft Logo"></Image>
              <Image src="./playstore.png" h={10} alt="Play Store Logo"></Image>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
