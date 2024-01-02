import { useState } from "react";
import useauthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import useUserProfileStore from "../store/useUserProfileStore";

const useEditProfile = () => {
  const [isUpdating, setisUpdating] = useState(false);

  const authUser = useauthStore((state) => state.user);

  const setauthUser = useauthStore((state) => state.setUser);

  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  const editProfile = async (input, selectedFile) => {
    // if the profile is updating and user clicks on the submit button again then do not call the update again
    if (isUpdating || !authUser) return;
    setisUpdating(true);

    // uploading the image into the storage of firebase
    //  ref:https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_string
    // we are uploading the img data_url which is a string, we converted the img to string in usePreview.js hook.
    // storing the image data in the firebase storage->profilePics/id path
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    // getting the userDoc from firestore to update it.
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        // uploading the img data in the firebase storage
        await uploadString(storageRef, selectedFile, "data_url");
        // getting the uploaded data from storage and storing it in the URl var to update the users.profilePicUrl in firestore
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));

        // only updating the fullName,userName,bio and profile pic rest all the data will not get updated
        // this will happen when the user edits the profile.
        const updatedUser = {
          ...authUser,
          fullName: input.fullName || authUser.fullName,
          username: input.userName || authUser.userName,
          bio: input.bio || authUser.bio,
          profilePicUrl: URL || authUser.profilePicUrl,
        };

        // updating the userDoc with updateUser objec
        await updateDoc(userDocRef, updatedUser);
        // setting the updated user in the local-storage
        localStorage.setItem("user-info", JSON.stringify(updatedUser));
        //updating the authenticated user state
        setauthUser(updatedUser);
        //updating the user profile state.
        setUserProfile(updatedUser);

        showToast("Success", "Profile Updated Sucessfully", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { editProfile, isUpdating };
};

export default useEditProfile;
