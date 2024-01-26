import { BiLibrary } from "react-icons/bi";
import { create } from "zustand";
// zustand refrence
// https://github.com/pmndrs/zustand
// this library is used for state management
// first we nned to create a store using zustand create method which is available on its doc

const useauthStore = create((set) => ({
  // No user is authenticated when the application is first opened
  //this is the state
  // getting the user from the local storage
  user: JSON.parse(localStorage.getItem("user-info")),
  //when the user log's in update the user state using the set method
  // it will take a value and set that value in the user state
  login: (user) => set({ user }),
  //when the user log's out update the user again
  logout: () => set({ user: null }),

  //setter function
  // this function will be used when we update the userdata
  setUser: (user) => set({ user }),
}));

export default useauthStore;
