import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import useGetuserProfileById from "../../hooks/useGetuserProfileById";



//This Component Contains the Post header, The Post image, and the Post Footer.

const FeedPost = ({ post }) => {
  const { userProfile, isLoading } = useGetuserProfileById(post.createdBy);

  return (
    <>

      {!isLoading && (
        <>
          <PostHeader post={post} creatorProfile={userProfile} />
          <Box my={2} borderRadius={4} overflow={"hidden"}>
            <Image src={post.imageUrl} alt={"FEED POST IMG"} />
          </Box>
          <PostFooter post={post} creatorProfile={userProfile} />
        </>
      )}
    </>
  );
};

export default FeedPost;
