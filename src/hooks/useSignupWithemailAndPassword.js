import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useauthStore from "../store/authStore";

// creating a custom react hooks for anthentication
//this hook uses the react-firebase-hooks for authentication which is available on its gitHub.

const SignupWithemailAndPassword = () => {
  // this usestate is taken from react firebase hooks which gives different states.
  // the useCreateUserWithEmailAndPassword takes the auth which is imported from the firebase config file.
  // ref: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usecreateuserwithemailandpassword
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

    // Checking if the userName is already taken or not, using firestore querys
    //ref: https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
    // storing the users collection from firestore db into userRef
    const userRef = collection(firestore, "users");
    // Create a query against the collection.
    // initilizing the query Select userRef where userName==input.userName
    // this query will return the userName data which is equal to userName entered into the signup form
    const q = query(userRef, where("userName", "==", input.userName));

    // the getDocs() method is used to retrive he result of the query
    const querySnapshot = await getDocs(q);
    // if query is not empty display the toast.
    if (!querySnapshot.empty) {
      showToast("Erroe", "Username already taken", "error");
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
