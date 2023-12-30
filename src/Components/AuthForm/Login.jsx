import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //import the login hook
  const { login, loading, error } = useLogin();
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

      {/* display an alert if there is an error in singnup */}
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        fontSize={14}
        size={"sm"}
        onClick={() => login(input)}
        isLoading={loading}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
