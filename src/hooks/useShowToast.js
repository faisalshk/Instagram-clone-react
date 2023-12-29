import { useToast } from "@chakra-ui/react";

//this showToast hook is used to create a toast which is chakraUi component but customizing this component using this hook
// the toast is basically a staus/error message which shows after sucessfull or unscessfull signup
const useShowToast = () => {
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToast;
