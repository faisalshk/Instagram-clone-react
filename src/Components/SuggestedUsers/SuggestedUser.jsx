import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useauthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid)

  const authUser = useauthStore(state => state.user)

  const onFollowUser = async () => {
    await handleFollowUser()

    //update the user state
    setUser({
      ...user,
      followers: isFollowing ? user.followers.filter(follower => {
        follower.uid !== authUser.uid
      }) : [...user.followers, authUser]
    })
  }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.userName}`}>
          <Avatar src={user.profilePicURL} size={"md"} />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Link to={`/${user.userName}`}>
            <Box fontSize={12} fontWeight={"bold"} color={"white"}>
              {user.fullName}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {
        authUser.uid !== user.uid && (
          <Button
            fontSize={13}
            bg={"transparent"}
            p={0}
            h={"max-content"}
            fontWeight={"medium"}
            color={"blue.400"}
            _hover={{ color: "white" }}
            onClick={onFollowUser}
            isLoading={isUpdating}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )
      }
    </Flex>
  );
};

export default SuggestedUser;
