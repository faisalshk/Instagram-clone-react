import { useFocusOnHide } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import usePostStore from "../store/usePostStore";
import useauthStore from "../store/authStore";
import useUserProfileStore from "../store/useUserProfileStore";
import {
  collection,
  getDocs,
  getDocsFromCache,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const { post, setPost } = usePostStore();
  const authUser = useauthStore((state) => state.user);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  useEffect(() => {
    const getFeedPost = async () => {
      setIsLoading(true);
      // if the user does not follow any one then the post array is empty
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPost([]);
      }

      //this query will give us the post of the users we follow
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        //await for the results
        const querySnapShot = await getDocs(q);
        const feedPosts = [];

        //loop over the data and push the data object in the feedpost array with the id
        querySnapShot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);

        setPost(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    // if the user exists then run this functions
    if (authUser) getFeedPost();
    //the useEffect will every time the below value changes
  }, [authUser, setPost, showToast, setUserProfile]);
  return { isLoading, post };
};

export default useGetFeedPost;
