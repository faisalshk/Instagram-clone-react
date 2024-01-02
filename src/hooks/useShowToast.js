import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

//this showToast hook is used to create a toast which is chakraUi component but customizing this component using this hook
// the toast is basically a staus/error message which shows after sucessfull or unscessfull signup
const useShowToast = () => {
  const toast = useToast();

  // useCallback is used to prevent infinite loop which is caused by useEffect hook which was used in the useGetUserProfileByUsername.js hook
  //this is done by caching the function
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
