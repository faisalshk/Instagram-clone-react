import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import React from "react";
import useGetuserProfileById from "../../hooks/useGetuserProfileById";


import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
//comment component

const Comment = ({ comment }) => {

  //this hook will get the profile data of the user who has commented on the post by taking in the Id of the user who has commented
  const { userProfile, isLoading } = useGetuserProfileById(comment.createdBy)

  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      {/* navigate to the user who has commented */}
      <Link to={`/${userProfile.userName}`}>
        <Avatar src={userProfile.profilePicUrl} size={"sm"} />
      </Link>

      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>

          <Link to={`/${userProfile.userName}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.userName}
            </Text>
          </Link>

          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>

        <Text fontSize={12} color={"gray"}>
          {timeAgo(comment.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w='10' />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};