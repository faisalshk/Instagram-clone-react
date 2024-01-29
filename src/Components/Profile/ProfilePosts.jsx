import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ProfilePost from "./ProfilePost";
import useGetUsersPosts from "../../hooks/useGetUsersPosts";

// Profile posts comonent whith sekelton loaders

const ProfilePosts = () => {
  const { isLoading, post } = useGetUsersPosts()
  console.log(post)

  const noPostfound = !isLoading && post.length === 0
  if (noPostfound) return <NoPostFound />

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1,1fr)",
        md: "repeat(3,1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2, 3].map((_, i) => (
          <VStack key={i} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>Content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {post.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostFound = function () {
  return (
    <Flex flexDir={'column'} mx={'auto'} mt={10} textAlign={'center'}>
      <Text fontSize={'2xl'}>No Post Found 😢</Text>
    </Flex>
  )
}