import {
  Container,
  Flex,
  Text,
  Link,
  SkeletonCircle,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "../../Components/Profile/ProfileHeader";
import ProfileTabs from "../../Components/Profile/ProfileTabs";
import ProfilePosts from "../../Components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams, Link as RouterLink } from "react-router-dom";

//Profile Page Component

const ProfilePage = () => {
  // the below hook will give us the user name when ever we visit the profile page
  //localhosh:5137/faisal
  // userName = faisal
  const { username } = useParams();

  //passing the userName in the getUserProfile hook
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);

  // if User if not Found
  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW={"container.lg"} p={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        {/* if not loading show the profile header */}
        {!isLoading && userProfile && <ProfileHeader />}
        {/* while it loads display the skeleton */}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        // borderTop={"1px solid"}
        // borderColor={"whiteAlpha.500"}
        direction={"column"}
      >
        {/* Profiletabs */}
        <ProfileTabs />
        {/* ProfilePosts */}
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <Flex fl exDir={"column"} alignItems={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found!!</Text>
      <Link
        to={"/"}
        as={RouterLink}
        mx={"auto"}
        w={"max-content"}
        color={"blue.500"}
      >
        Go Home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size={24} />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        mx={"auto"}
        gap={2}
        flex={1}
      >
        <Skeleton height={"12px"} width={"150px"} />
        <Skeleton height={"12px"} width={"150px"} />
      </VStack>
    </Flex>
  );
};
