import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SuggestedUser from "./SuggestedUser";
import SuggestedHeaders from "./SuggestedHeaders";

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeaders />
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
      <SuggestedUser
        name="Dan Abramov"
        followers={585}
        avatar={"https://bit.ly/dan-abramov"}
      />
      <SuggestedUser
        name="Ryan Florence"
        followers={4546}
        avatar={"https://bit.ly/ryan-florence"}
      />
      <SuggestedUser
        name="Christan"
        followers={7545}
        avatar={"https://bit.ly/code-beast"}
      />

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
