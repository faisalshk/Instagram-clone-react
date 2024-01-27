import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useauthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import useUserProfileStore from "../../store/useUserProfileStore";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  //checking if the user is visiting it's own profile
  // if the user is visiting it's own profile show the edit button or if the user is visiting someone else profile show he follow button
  // getting the authenticated user
  const authuser = useauthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(userProfile.uid);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

  const visitingOwnProfileandAuth =
    authuser && authuser.userName === userProfile.userName;

  const visitingAnotherProfileandAuth =
    authuser && authuser.userName !== userProfile.userName;

  // chakra UI modal

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar
          name="Faisal_suleman"
          src={userProfile.profilePicUrl}
          alt="Faisal Suleman pic logo"
        />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "colum", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.userName}
          </Text>
          {/* if user is visiting it's own profile then show the edit button */}
          {visitingOwnProfileandAuth && (
            <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "WhiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitingAnotherProfileandAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.post.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"} letterSpacing={1}>
          {userProfile.bio}
        </Text>
      </VStack>
      {/* if modal is open render this component */}
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
