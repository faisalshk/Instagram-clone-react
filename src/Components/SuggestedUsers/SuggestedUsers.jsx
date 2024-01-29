import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SuggestedUser from "./SuggestedUser";
import SuggestedHeaders from "./SuggestedHeaders";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {

  const { isLoading, suggestedUser } = useGetSuggestedUsers()


  if (isLoading) return null

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeaders />

      {suggestedUser.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See All
          </Text>
        </Flex>
      )}


      {suggestedUser.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        @ 2023 built by{"  "}
        <Link href="#" target="_blank" color={"blue.500"} fontSize={12}>
          Shaikh Faisal Suleman
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
