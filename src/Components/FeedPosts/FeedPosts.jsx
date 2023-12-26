import {
  Container,
  Flex,
  VStack,
  SkeletonCircle,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";

//This Component renders the Feed's Post.

const FeedPosts = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {/* rendering the skeleton loader 4 times */}
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} alignItems={"flex-start"} gap={4} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" width="200px" />
                <Skeleton height="10px" width="200px" />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {/* giving props to the feedpost for username, post image, avatar */}

      {!isLoading && (
        <>
          <FeedPost
            img="./Profile Image.jpeg"
            userName="Faisal_suleman"
            avatar="./Profile Image.jpeg"
          />
          <FeedPost img="./img3.png" userName="Johndoe" avatar="./img3.png" />
          <FeedPost img="./img2.png" userName="Josh" avatar="./img2.png" />
          <FeedPost
            img="./img1.png"
            userName="burakorkmezz"
            avatar="./img1.png"
          />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
