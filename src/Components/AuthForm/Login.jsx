import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        size={"sm"}
        type="Email"
        //Input Value
        value={input.email}
        // getting the value of the input and storing it the input object
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      ></Input>
      <Input
        placeholder="Password"
        fontSize={14}
        size={"sm"}
        type="password"
        //Input Value
        value={input.password}
        // getting the value of the input and storing it the input object
        onChange={(e) => setInput({ ...input, password: e.target.value })}
      ></Input>
      <Button w={"full"} colorScheme="blue" fontSize={14} size={"sm"}>
        Log in
      </Button>
    </>
  );
};

export default Login;
