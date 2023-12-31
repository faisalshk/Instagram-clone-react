import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { auth, firestore } from "../../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import useauthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { json } from "react-router-dom";

const GoogleAuth = ({ prefix }) => {
  // handling google authntication with reace-firebase-hook
  //ref: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usesigninwithgoogle
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useauthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // how to know if the user is signing up or logging in
      // to do this we will retrive the user from the firestore, then we will check if the user exists of not.
      // if the user exists then login the user and do not create userDoc again.
      //else signup the user and store the userDoc in firestore db.
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        //logging in

        //getting the user data
        const userDoc = userSnap.data();

        //setting the user data in localstorage
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        //updating the global user state
        loginUser(userDoc);
      } else {
        // signing up

        // this user doc will be created in the fireStore
        //faisal@gmail.com
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          // password: input.password,
          fullName: newUser.user.displayName,
          userName: newUser.user.email.split("@")[0], //faisal
          bio: "",
          profilePicUrl: newUser.user.photoURL,
          followers: [],
          following: [],
          post: [],
          createdAt: Date.now(),
        };

        // adding the document to the fireStore Object
        // refrence https://firebase.google.com/docs/firestore/manage-data/add-data
        // ((db,collection name, id),data)
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        //storing the data in local storage
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        //updating the state
        loginUser(newUser);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={handleGoogleAuth}
      >
        <Image src="./google.png" alt="Google logo" w={5}></Image>
        <Text color={"blue.500"} mx={2}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
