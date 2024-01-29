import { create } from "zustand";

// this store is used to store the user profile data
// also able to set the user profile data
const usePostStore = create((set) => ({
  post: [],
  createPost: (post) => set((state) => ({ post: [post, ...state.post] })),

  //this will filter out the post whos id passed into the function is not equal to the post.id
  deletePost: (id) =>
    set((state) => ({ post: state.post.filter((post) => post.id !== id) })),
  //addComment
  //it will take in a new post and update the state .
  setPost: (post) => set({ post }),
}));

export default usePostStore;
