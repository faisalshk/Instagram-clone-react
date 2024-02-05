import {
  Container,
  Flex,
  VStack,
  SkeletonCircle,
  Skeleton,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPost from "../../hooks/useGetFeedPost";

//This Component renders the Feed's Post.

const FeedPosts = () => {
  const { isLoading, post } = useGetFeedPost()



  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {/* rendering the skeleton loader 4 times */}
      {isLoading &&
        [0, 1, 2].map((_, index) => (
          <VStack key={index} alignItems={"flex-start"} gap={4} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" width="200px" />
                <Skeleton height="10px" width="200px" />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {/* giving props to the feedpost for username, post image, avatar */}

      {!isLoading && post.length > 0 && post.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && post.length === 0 && (
        <>
          <Text fontSize={'md'} color={'red.400'} >Dayumm, Looks like you do not have any friends!!</Text>
          <Text color={'red.400'}>Stop Coding and go make some!!</Text>
        </>
      )
      }
    </Container >
  );
};

export default FeedPosts;
