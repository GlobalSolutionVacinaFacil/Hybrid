import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "../hooks/vendors/use-firebase";
import { useAuth } from "../hooks/use-auth";

export interface AuthContextProps {
  user: User | undefined;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleSignout: () => void;
}
export interface AuthContextProviderProps {
  children: JSX.Element;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { init } = useFirebase();
  const { login, register } = useAuth();
  const [user, setUser] = useState<User>();
  const [instance, setInstance] = useState<FirebaseApp>();
  const [auth, setAuth] = useState<Auth>();

  const handleSignout = () => {
    setUser(undefined);
  };

  const handleLogin = async (email: string, password: string) => {
    if (!auth) return;

    const user = await login(auth, email, password);
    setUser(user);
  };

  const handleRegister = async (email: string, password: string) => {
    if (!auth) return;

    const user = await register(auth, email, password);
    setTimeout(() => {
      setUser(user);
    }, 5000);
  };

  useEffect(() => {
    const { app, auth } = init();
    setAuth(auth);
    setInstance(app);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleRegister, handleSignout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
