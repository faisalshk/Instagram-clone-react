import React, { useEffect, useState } from "react";
import useauthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
  // initially it is hoing to be an empty array which we are going to fill after we get users which is in the storage
  const [suggestedUser, setSuggesteduser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authUser = useauthStore((state) => state.user);
  const showToast = useShowToast();

  //using useEffect because we want to show the suggested user when the user logged in to the application and we want to change the suggested user when there is a change in the authenticated user datas
  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        // select from users where uid is not in [authUser.uid and authUser.following array] order by uid and limit only 3, we are doing this because we do not want to suggest ourselves and we do not want to suggest the user we follow
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );

        const querySnapshot = await getDocs(q);

        const users = [];

        querySnapshot.forEach((doc) => {
          // we are pushing an object into the array so that when we map over the array we do not get any key errors
          users.push({ ...doc.data(), id: doc.id });
        });

        //pass the users  to the suggestedUsers()
        setSuggesteduser(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    //only run this function if there is an authenticated user
    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return { isLoading, suggestedUser };
};

export default useGetSuggestedUsers;
