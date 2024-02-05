import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assest/Constants";
import usePostComment from "../../hooks/usePostComment";
import useauthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from '../../utils/timeAgo'

//This Component renders the post footer.

const PostFooter = ({ post, creatorProfile, isProfilePage }) => {

  //taking the authenticated user
  const authUser = useauthStore(state => state.user)

  const { isCommenting, handlePostComment } = usePostComment()
  // useState for liked post
  // const [liked, setLiked] = useState(false);
  //useState for number of likes
  // const [likes, setLikes] = useState(1000);
  //useState for comments
  const [comment, setComment] = useState('')
  //this useRef is used to focus the comment input when e click the comment logo
  const commentRef = useRef(null)

  const { handleLikePost, liked, likes } = useLikePost(post)

  const handleSubmitcomment = async () => {
    // this function will update the post in the posts collection by taking in the post.id to which the user is posting a comment and also the comment.
    await handlePostComment(post.id, comment)
    //after posting set the comment to empty string
    setComment('')
  }

  // const handleLiked = () => {
  //   // if like is ture set the liked to false and decerease the number of likes, else set ture and increase the number of likes.
  //   if (liked) {
  //     setLiked(false);
  //     setLikes(likes - 1);
  //   } else {
  //     setLiked(true);
  //     setLikes(likes + 1);
  //   }
  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} w={"full"} p={0} mb={2} mt={4} gap={4}>
        {/* onClick on the like button to like and unlike the post */}
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {/* the NotificationsLogo is the filled like logo  */}
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {isProfilePage && (
        <Text fontSize={12} color={'gray'}>Posted, {timeAgo(post.createdAt)}</Text>
      )}
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.userName}
            {/* The as tag makes the Text tag to span, if we do not use the as attribute the text tag will act as a praragraph. */}
            <Text as={"span"} fontWeight={400}>
              {" "}
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
              View all {post.comments.length} comments
            </Text>
          )}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"full"}
          gap={2}
        >
          {/* InputGroup is the chakra ui element */}
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder="Add a comment...."
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            ></Input>
            <InputRightElement>
              {/* onclick the post button to post a comment */}
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitcomment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
