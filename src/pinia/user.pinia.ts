import { defineStore } from "pinia";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { IUserState } from "../ts/pinia/user.types.ts";

export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    user: null,
    authInitialized: false,
  }),
  getters: {
    getUser: (state: IUserState): User | null => {
      return state.user;
    },
  },
  actions: {
    setUser(user: User): void {
      this.user = user;
      this.authInitialized = true;
    },
    clearUser() {
      this.user = null;
      this.authInitialized = false;
    },
    initializeAuthListener() {
      onAuthStateChanged(auth, (user: User | null): void => {
        user ? this.setUser(user) : this.clearUser();
      });
    },
  },
});
