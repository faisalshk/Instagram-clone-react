import { create } from "zustand";

// this store is used to store the user profile data
// also able to set the user profile data
const usePostStore = create((set) => ({
  post: [],
  createPost: (post) => set((state) => ({ post: [post, ...state.post] })),

  //this will filter out the post whos id passed into the function is not equal to the post.id
  deletePost: (id) =>
    set((state) => ({ post: state.post.filter((post) => post.id !== id) })),

  // this will take in the comment and the postId, after that it will map over the post array and will check if the postId passed into the function is equal to the post.id we are mapping over, if it is equal then update that post comments array and return the updated post, else return the post as it is.
  addComment: (postId, comment) =>
    set((state) => ({
      post: state.post.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
  //it will take in a new post and update the state .
  setPost: (post) => set({ post }),
}));

export default usePostStore;
