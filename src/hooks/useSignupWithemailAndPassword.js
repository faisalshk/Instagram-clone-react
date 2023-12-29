import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useauthStore from "../store/authStore";

// creating a custom react hooks for anthentication
//this hook uses the react-firebase-hooks for authentication which is available on its gitHub.

const SignupWithemailAndPassword = () => {
  // this usestate is taken from react firebase hooks which gives different states.
  // the useCreateUserWithEmailAndPassword takes the auth which is imported from the firebase config file.
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();

  // using the zustand state that we created
  const loginUser = useauthStore((state) => state.login);

  //handling the authentication
  const signup = async function (input) {
    //if the inputs are empty then return
    if (!input.email || !input.userName || !input.fullName || !input.password) {
      showToast("Error", "Please fill all the fields!!", "error");
      return;
    }
    try {
      //creating a new user
      const newUser = await createUserWithEmailAndPassword(
        input.email,
        input.password
      );

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      // if username is available then create the userDoc
      if (newUser) {
        // this user doc will be created in the fireStore
        const userDoc = {
          uid: newUser.user.uid,
          email: input.email,
          // password: input.password,
          fullName: input.fullName,
          userName: input.userName,
          bio: "",
          profilePicUrl: "",
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

  return { loading, error, signup };
};

export default SignupWithemailAndPassword;
