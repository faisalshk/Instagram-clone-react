import React, { useEffect, useState } from "react";
import usePostStore from "../store/usePostStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { StepStatus } from "@chakra-ui/react";

// this hook is used to get the post of the authenticated user
const useGetUsersPosts = () => {
  const [isLoading, setIsloading] = useState(true);
  const post = usePostStore((state) => state.post);
  const setPost = usePostStore((state) => state.setPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  useEffect(() => {
    const getPost = async () => {
      if (!userProfile) return;
      setIsloading(true);
      setPost([]);

      try {
        // getting the post of the user by using a query
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );

        // getting the result of the query by using getDocs and storing it in the querySnapShot
        const querySnapShot = await getDocs(q);
        // empty post array
        const post = [];
        // looping over the querySnapShot and pushing tha data into the post array
        querySnapShot.forEach((doc) => {
          post.push({ ...doc.data(), id: doc.id });
        });

        //sorting the post array by the date
        post.sort((a, b) => b.createdAt - a.createdAt);
        setPost(post);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPost([]);
      } finally {
        setIsloading(false);
      }
    };
    getPost();
  }, [showToast, userProfile, setPost]);

  return { isLoading, post };
};

export default useGetUsersPosts;
