import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    authInitialized: false,
  }),
  actions: {
    setUser(user: any): void {
      this.user = user;
      this.authInitialized = true;
    },
    clearUser() {
      this.user = null;
      this.authInitialized = false;
    },
    initializeAuthListener() {
      onAuthStateChanged(auth, (user: any): void => {
        user ? this.setUser(user) : this.clearUser();
      });
    },
  },
});
