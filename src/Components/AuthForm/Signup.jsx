import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSignupWithemailAndPassword from "../../hooks/useSignupWithemailAndPassword";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignupWithemailAndPassword();

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="Email"
        size={"sm"}
        //Input Value
        value={input.email}
        // getting the value of the input and storing it the input object
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      ></Input>

      <Input
        placeholder="fullName"
        fontSize={14}
        type="text"
        size={"sm"}
        //Input Value
        value={input.fullName}
        // getting the value of the input and storing it the input object
        onChange={(e) => setInput({ ...input, fullName: e.target.value })}
      ></Input>

      <Input
        placeholder="username"
        fontSize={14}
        size={"sm"}
        type="text"
        //Input Value
        value={input.userName}
        // getting the value of the input and storing it the input object
        onChange={(e) => setInput({ ...input, userName: e.target.value })}
      ></Input>

      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          size={"sm"}
          //Input Value
          value={input.password}
          // getting the value of the input and storing it the input object
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        ></Input>

        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* display an alert if there is an error in singnup */}
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      {/* the isLoading attribute is coming from chakra */}
      <Button
        w={"full"}
        colorScheme="blue"
        fontSize={14}
        size={"sm"}
        onClick={() => signup(input)}
        isLoading={loading}
      >
        Sign up
      </Button>
    </>
  );
};

export default Signup;
