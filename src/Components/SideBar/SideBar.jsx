import { Avatar, Box, Flex, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assest/Constants";

const SideBar = () => {
  // this is the side bar menu object
  // this array object contains all the icons of the sidebar and the text which on hover will be shown and the link to navigate to pages.
  const sideBarItems = [
    { icon: <AiFillHome size={25} />, text: "home", link: "/" },
    { icon: <SearchLogo />, text: "search" },
    { icon: <NotificationsLogo />, text: "Notification" },
    { icon: <CreatePostLogo />, text: "Create Post" },
    {
      //Avatar is the UI conponent of chakra which is used for profile image.
      icon: <Avatar size={"sm"} name="Burak Orkmez" src="./profilepic.png" />,
      text: "profile",
      link: "/faisal",
    },
  ];

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid "}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} height={"full"} w={"full"}>
        {/* import the link as router link so that we can add style to it like a normal cahkra component */}
        {/* insta logo */}
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>

        {/* insta mobile logo */}
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={10}
          cursor={"pointer"}
        >
          <InstagramMobileLogo />
        </Link>

        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {/* looping over the sidebar array */}
          {sideBarItems.map((item, index) => (
            // the tooltip is used to display the text when the user interacts with the element
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                alignItems={"center"}
                to={item.link || null}
                as={RouterLink}
                gap={4}
                _hover={{
                  bg: "whiteAlpha.400",
                }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {item.icon}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default SideBar;
