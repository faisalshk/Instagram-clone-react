import React, { useEffect, useState } from "react";
import useauthStore from "../store/authStore";
import useUserProfileStore from "../store/useUserProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";

// this hook is to check if the user is following a certian user or not
//the userId will be used to see if we are following or not following
const useFollowUser = (userId) => {
  const [isUpdating, setisUpdating] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);

  //getting the authenticated user
  const authUser = useauthStore((state) => state.user);
  const setAuthUser = useauthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();
  //function to handle following functionality
  const handleFollowUser = async function (userId) {
    setisUpdating(true);
    try {
      //getting the refrance of the authenticated user and the userId
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFolloworUnfollowref = doc(firestore, "users", userId);

      //updating the following array of the currentUser and followers array of user we are going to follow in the firestore database
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFolloworUnfollowref, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        //unfollow
        setAuthUser({
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        });

        setUserProfile({
          ...userProfile,
          followers: userProfile.followers.filter(
            (uid) => uid !== authUser.uid
          ),
        });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );

        setisFollowing(false);
      } else {
        //follow
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId],
        });
        setUserProfile({
          ...userProfile,
          followers: [...userProfile.followers, authUser.uid],
        });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );

        setisFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setisUpdating(false);
    }
  };

  //using useEffect to initiailized the first render
  useEffect(() => {
    if (authUser) {
      // checking if the authUser's following array contains the userId
      const isFollowing = authUser.following.includes(userId);
      setisFollowing(isFollowing);
    }
    // the useEffect will every time the authUser or the userId changes
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
