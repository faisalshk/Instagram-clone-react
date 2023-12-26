import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

//This Component Contains the Post header, The Post image, and the Post Footer.

const FeedPost = ({ img, userName, avatar }) => {
  return (
    <>
      <PostHeader userName={userName} avatar={avatar} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt={userName}></Image>
      </Box>
      <PostFooter userName={userName} />
    </>
  );
};

export default FeedPost;
