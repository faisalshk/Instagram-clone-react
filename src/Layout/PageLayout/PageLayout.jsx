import { Flex, Box, Spinner } from "@chakra-ui/react";
import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../Components/Navbar/Navbar";

// this component maintains the layout of the page. this is a reusable comopnent

const PageLayout = ({ children }) => {
  // this hook is used to give the path of the page we navigate to
  const { pathname } = useLocation();

  // using the authstate hook form react-firebase-hooks to check if there is a user or not
  // the user will be null if we are not authenticated, else the user will hold the user value after authentication
  const [user, loading] = useAuthState(auth);

  //checking when sould we render the sidebar
  const canRenderSidebar = pathname !== "./auth" && user;

  //checking when should we render the navbar
  //render the navbar if there is no user, no background loading and if we are not in auth page
  const canRenderNavbar = !user && !loading && pathname !== "./auth";

  //display the page layout spinner
  // if there is no user and the loading state is true, the loading will be true while the user is being fetch from the background and at the time of fetching the user is also empty, after fetching is done he user will hold a value
  const checkingUserisAuth = !user && loading;
  // if the internet connection is slow the check will take a long time at that point we will show a spinner
  if (checkingUserisAuth) return <PageLayoutSpinner />;

  //Instead of adding a sidebar component at every page, we can add it only once to the page layout component and wrap the children within it. This way we can have the sidebar on every page except the Auth Page.
  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}
      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}
      {/* the page content on the right */}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>

    // <Flex flexDir={canRenderNavbar ? "column" : "row"}>
    //   {/* side bar on the left  */}
    //   {canRenderSidebar ? (
    //     // if pathname is not auth then render the sidebar, else null
    //     <Box w={{ base: "70px", md: "240px" }}>
    //       <SideBar />
    //     </Box>
    //   ) : null}

    //   {/* Navbar */}
    //   {/* render the navbar if canRenderNavbar is true */}
    //   {canRenderNavbar ? <Navbar /> : null}

    //   {/* page content on the right */}
    //   {/* the children contains all the pages which was passed in the page layout in the app.jsx and all these children element will be on the right side of the page */}
    //   <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
    //     {children}
    //   </Box>
    // </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"}></Spinner>
    </Flex>
  );
};
