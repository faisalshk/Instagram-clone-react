import React from "react";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import useauthStore from "../store/authStore";

//loging hooks
const useLogin = () => {
  const showToast = useShowToast();

  // useSignInWithEmailAndPassword hook from firebase // https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usesigninwithemailandpassword
  // this hook is used to signin the user into firebase
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // using the authStore hook to update the global state
  const loginUser = useauthStore((state) => state.login);

  const login = async (input) => {
    //checking if the inouts field are empty or not and if empty throw the toast
    if (!input.email || !input.password) {
      showToast("Error", "Please fill all the fields!!", "error");
      return;
    }
    try {
      // using the firebase hook func from above to signin
      const userCred = await signInWithEmailAndPassword(
        input.email,
        input.password
      );
      //if user exists then retrive the user datas
      if (userCred) {
        // getting the user Document from firebase
        // the doc() method takes in the db i.e. firestore, the collection i.e. user, and the id
        //ref: https://firebase.google.com/docs/firestore/query-data/get-data#get_a_documents
        const docRef = doc(firestore, "users", userCred.user.uid);
        // the getDoc() ifs used to retrive the user data
        const docSnap = await getDoc(docRef);
        //set the user data into the localstorge
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        //updating the login state
        //this will update the user state globally.
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { login, loading, error };
};

export default useLogin;
