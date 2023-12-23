import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useLocation } from "react-router-dom";

const PageLayout = ({ children }) => {
  // this hook is used to give the path of the page we navigate to
  const { pathname } = useLocation();
  return (
    <Flex>
      {/* side bar on the left  */}
      {pathname !== "/auth" ? (
        // if pathname is not auth then render the sidebar, else null
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}

      {/* page content on the right */}
      {/* the children contains all the pages which was passed in the page layout in the app.jsx and all these children element will be on the right side of the page */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
