import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import FeedPosts from "../../Components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../Components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        {/* FeedPosts */}
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>

        {/* SuggestUsers */}
        <Box
          flex={2}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
