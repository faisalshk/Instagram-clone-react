import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

// this component renders the post header

const PostHeader = ({ post, creatorProfile }) => {

  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy)

  return (
    <Flex
      justifyContent={"space-between"}
      w={"full"}
      alignItems={"center"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>

        {creatorProfile ? (
          <Link to={`/${creatorProfile.userName}`}>
            <Avatar src={creatorProfile.profilePicUrl} alt='user profile pic' size={"sm"} />
          </Link>) : (
          <SkeletonCircle size={10} />
        )}


        <Flex fontSize={12} fontWeight={"bold"} gap={"2"}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.userName}`}>
              <Box>{creatorProfile.userName}</Box>
            </Link>
          ) : (
            <Skeleton w={'100px'} h={'100px'} />
          )}

          <Box color={"gray.500"}>. 1w</Box>
        </Flex>
      </Flex>

      <Box cursor={"pointer"}>
        <Button
          size={'xs'}
          bg={'transparent'}
          fontSize={12}
          fontWeight={"bold"}
          color={"blue.500"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
