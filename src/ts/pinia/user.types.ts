import { User } from "firebase/auth";

export interface IUserState {
  user: User | null;
  authInitialized: boolean;
}
