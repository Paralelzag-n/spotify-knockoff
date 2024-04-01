import { useUserStore } from "../pinia/user.pinia.ts";
import { useAuth } from "../composable/useAuth.ts";

export default async function authGuard(_to: any, _from: any, next: any) {
  const authStore = useUserStore();
  const { isUserLoggedIn } = useAuth();

  if (!authStore.authInitialized) {
    try {
      const user = await isUserLoggedIn();
      if (user) next();
      else next({ name: "sign-in" });
    } catch (error) {
      console.error("Error checking user login status:", error);
      next({ name: "sign-in" });
    }
  } else authStore.user ? next() : next({ name: "sign-in" });
}

export async function guestGuard(_to: any, _from: any, next: any) {
  const authStore = useUserStore();
  const { isUserLoggedIn } = useAuth();

  if (!authStore.authInitialized) {
    try {
      const user = await isUserLoggedIn();
      if (user) next({ name: "home" });
      else next();
    } catch (error) {
      console.error("Error checking user login status:", error);
      next();
    }
  } else {
    authStore.user ? next({ name: "home" }) : next();
  }
}
