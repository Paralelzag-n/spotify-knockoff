import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ref } from "vue";

export function useAuth() {
  const signInLoading = ref<boolean>(false);
  const signUpLoading = ref<boolean>(false);
  const signOutLoading = ref<boolean>(false);

  function isUserLoggedIn() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

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

  const googleAuthProvider = new GoogleAuthProvider();

  async function signInWithGoogle() {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const credential =
        GoogleAuthProvider.credentialFromResult(userCredential);
      if (!credential) return;
      const token = credential.accessToken;
      const user = userCredential.user;

      return { token, user };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);
    }
  }

  return {
    signUp,
    signIn,
    signOut,
    isUserLoggedIn,
    signUpLoading,
    signInLoading,
    signOutLoading,
    signInWithGoogle,
  };
}
