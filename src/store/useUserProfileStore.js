import { create } from "zustand";

// this store is used to store the user profile data
// also able to set the user profile data
const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
}));

export default useUserProfileStore;
