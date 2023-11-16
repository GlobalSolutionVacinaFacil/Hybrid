import { Auth } from "firebase/auth";
import { useFetch } from "./use-fetch";
import { useFirebase } from "./vendors/use-firebase";

export const useAuth = () => {
  const { signIn, signUp } = useFirebase();

  const login = async (auth: Auth, email: string, password: string) => {
    const user = await signIn(auth, email, password);

    return user;
  };

  const register = async (auth: Auth, email: string, password: string) => {
    const user = await signUp(auth, email, password);

    return user;
  };

  return { login, register };
};
