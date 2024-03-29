import React, { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

//this hook is used to search for a specific user by the userName

const useSearchUser = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (userName) => {
    setIsLoading(true);
    setUser(null);
    try {
      // initilizing a query to get the data of the user
      // select users where userName == UserName
      const q = query(
        collection(firestore, "users"),
        where("userName", "==", userName)
      );
      // the getDocs() method is used to retrive he result of the query
      const querySnapShot = await getDocs(q);

      // if the returned data is empty then throe the error and return out of the function
      if (querySnapShot.empty) {
        return showToast("Error", "User not Found", "error");
      }

      querySnapShot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { IsLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
