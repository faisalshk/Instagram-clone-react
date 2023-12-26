import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);
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
        [0, 1, 2, 3, 4, 5].map((_, i) => (
          <VStack key={i} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>Content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && (
        <>
          <ProfilePost img="./img1.png" />
          <ProfilePost img="./img2.png" />
          <ProfilePost img="./img3.png" />
          <ProfilePost img="./img4.png" />
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;
