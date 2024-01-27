import React, { useState } from "react";
import useShowToast from "./useShowToast";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/useUserProfileStore";

const useGetUserProfileByUsername = (userName) => {
  const [isLoading, setisLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  // this will get the user Profile data by the username, with the help of query
  useEffect(() => {
    const getUserProfiledata = async () => {
      setisLoading(true);
      try {
        // accessing the user collection
        const userRef = collection(firestore, "users");
        // initilizing the query, if the username is equal to the userName passed then return that username
        const q = query(userRef, where("userName", "==", userName));
        // retriving the user Data
        const querySnapshot = await getDocs(q);

        // if userName is not availabe, set the userProfile state to null
        if (querySnapshot.empty) {
          return setUserProfile(null);
        }

        // if user Exists then store the data in the userDoc variable
        let userDoc;
        // looping the retrive data because it is an array.
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        // set the user Profile
        setUserProfile(userDoc);
        console.log(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setisLoading(false);
      }
    };
    getUserProfiledata();
    // if any of the below value changes the use effect will run again.
  }, [setUserProfile, userName, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
