import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useauthStore from "../store/authStore";

// logout hook
const useLogout = () => {
  // using the signout from react-firebase-hooks to signput the user from firebase
  //ref: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usesignout
  const [signOut, isLoggingout, error] = useSignOut(auth);
  const showToast = useShowToast();

  //using the logout state
  const userLogout = useauthStore((state) => state.logout);

  // this function will be called when the user clicks the logout button
  const handleLogout = async () => {
    try {
      // signOut the user
      await signOut();
      //remove the user from localstorage
      localStorage.removeItem("user-info");
      //this logout will set the user state to null
      userLogout();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogout, isLoggingout, error };
};

export default useLogout;
