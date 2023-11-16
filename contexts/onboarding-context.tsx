import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./auth-context";

interface OnBoardingContextProps {
  handleRegister: (email: string, password: string) => Promise<void>;
}
interface OnBoardingContextProviderProps {
  children: JSX.Element;
}

export const OnBoardingContext = createContext<OnBoardingContextProps>(
  {} as OnBoardingContextProps
);

export const useOnboardingContext = () => useContext(OnBoardingContext);

export const OnBoardingContextProvider = ({
  children,
}: OnBoardingContextProviderProps) => {
  const { handleRegister: _handleRegister } = useAuthContext();

  const handleRegister = async (email: string, password: string) => {
    await _handleRegister(email, password);
  };

  return (
    <OnBoardingContext.Provider
      value={{
        handleRegister,
      }}
    >
      {children}
    </OnBoardingContext.Provider>
  );
};
