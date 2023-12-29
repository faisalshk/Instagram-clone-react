import { Avatar, Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Router, Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assest/Constants";
import useLogout from "../../hooks/useLogout";

// this is the sidebar component
// this component is a reusable component.

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
      icon: (
        <Avatar size={"sm"} name="Faisal_Suleman" src="./Profile Image.jpeg" />
      ),
      text: "profile",
      link: "/faisal",
    },
  ];

  //Using logout hook
  const { handleLogout, isLoggingout, error } = useLogout();

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
        {/* import the link as router link so that we can add style to it like a normal cahkra component and also we will be able to navigate between pages. */}
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
                to={item.link || null}
                as={RouterLink}
                alignItems={"center"}
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

        {/* Logout */}
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={() => handleLogout()}
            alignItems={"center"}
            gap={4}
            _hover={{
              bg: "whiteAlpha.400",
            }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            mt={"auto"}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingout}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default SideBar;
