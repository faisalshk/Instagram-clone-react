import React, { useState } from "react";
import useShowToast from "./useShowToast";

// this hook will help us to change the profile pictue when we change the user profile in the edit profile modal
const usePreviewimg = () => {
  // initilizing the profile state
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();

  // setting the max file size
  const maxFileSize = 2 * 1024 * 1024;

  // when image is selected run this function
  const handleImageChange = (e) => {
    // this will take the file we selected from the machine
    const file = e.target.files[0];

    // if there is a file and the type of the file is image
    if (file && file.type.startsWith("image/")) {
      // if file size is greater than max file size
      if (file.size > maxFileSize) {
        showToast("Error", "File size must be less than 2MB", "error");
        //set the selected file to null
        setSelectedFile(null);
        return;
      }

      // this hook is use to read the file this is react hook
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      // this will take the image file and convert it into a base64 string and set its result to the selected file in the onloadend function
      reader.readAsDataURL(file);
    } else {
      showToast("Error", error.message, "error");
      setSelectedFile(null);
    }
  };
  return { handleImageChange, selectedFile, setSelectedFile };
};

export default usePreviewimg;
