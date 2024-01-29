import { create } from "zustand";

// this store is used to store the user profile data
// also able to set the user profile data
const usePostStore = create((set) => ({
  post: [],
  createPost: (post) => set((state) => ({ post: [post, ...state.post] })),

  //Delete Post
  //addComment
  //setPost
}));

export default usePostStore;
