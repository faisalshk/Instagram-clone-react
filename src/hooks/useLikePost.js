import React, { useState } from "react";
import useauthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

//This hook is used Like and Unlike the post

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  //this state is used to keep a track of the likes array
  const [likes, setIslikes] = useState(post.likes.length);
  // this state is used to check if the user has already like the post or not, that is why the useState() takes in the likes array and checks if the likes array includes the user who has liked the post or not
  const authUser = useauthStore((state) => state.user);

  const [liked, setIsliked] = useState(post.likes.includes(authUser?.uid));

  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast("Error", "You must Login to like the post", "error");
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);

      updateDoc(postRef, {
        likes: liked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsliked(!liked);
      liked ? setIslikes(likes - 1) : setIslikes(likes + 1);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };
  return { handleLikePost, liked, likes, isUpdating };
};

export default useLikePost;
