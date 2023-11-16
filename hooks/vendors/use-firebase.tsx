import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "./firebase.config";

export const useFirebase = () => {
  const init = () => {
    let app;
    let auth;

    if (!getApps().length) {
      try {
        app = initializeApp(firebaseConfig);
        auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        });
      } catch (error) {
        console.log("Error initializing app: " + error);
      }
    } else {
      app = getApp();
      auth = getAuth(app);
    }

    return { app, auth };
  };

  const signIn = async (
    auth: Auth,
    email: string,
    password: string
  ): Promise<User> => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  };

  const signUp = async (
    auth: Auth,
    email: string,
    password: string
  ): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return user;
  };

  return { init, signIn, signUp };
};
