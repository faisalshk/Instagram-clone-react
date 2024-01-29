import { create } from "zustand";

// this store is used to store the user profile data
// also able to set the user profile data
const usePostStore = create((set) => ({
  posts: [],
  setPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

  //Delete Post
  //addComment
  //setPost
}));

export default usePostStore;
