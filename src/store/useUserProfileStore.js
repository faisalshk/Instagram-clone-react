import { create } from "zustand";

// this store is used to store the user profile data
// also able to set the user profile data
const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),

  //this function is used to update the number of posts in the profile section
  addPost: (post) =>
    //this will take in the previous state and in the userProfile object it will create an array post and stoe the posts id in that array so when we need to update the number of posts we can use posts.length
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
}));

export default useUserProfileStore;
