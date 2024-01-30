import React, { useState } from "react";
import useauthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useauthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const showToast = useShowToast();

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return; //to avoid overloading
    if (!authUser)
      return showToast("Error", "You mus log in to comment", "error");
    setIsCommenting(true);

    // creating a new comment object
    const newComment = {
      comment: comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId: postId,
    };
    try {
      // we will update the comments array which is in the posts collection and postId will be the post we want to update
      await updateDoc(doc(firestore, "posts", postId), {
        //the array union will all the newComment object in the comment array
        comments: arrayUnion(newComment),
      });

      //update the comments in the postStore which is the global state for posts
      addComment(postId, newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, handlePostComment };
};

export default usePostComment;
