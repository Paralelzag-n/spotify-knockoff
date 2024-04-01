import { auth } from "../firebase/index.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref } from "vue";

export function useAuth() {
  const signInLoading = ref<boolean>(false);
  const signUpLoading = ref<boolean>(false);
  const signOutLoading = ref<boolean>(false);

  async function signUp(email: string, password: string) {
    try {
      signUpLoading.value = true;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally {
      signUpLoading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      signInLoading.value = true;
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally {
      signInLoading.value = false;
    }
  }

  async function signOut() {
    try {
      signOutLoading.value = true;
      await auth.signOut();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally {
      signOutLoading.value = false;
    }
  }

  return {
    signUp,
    signIn,
    signOut,
    signUpLoading,
    signInLoading,
    signOutLoading,
  };
}
