import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "../contexts/auth-context";
import { OnBoardingContextProvider } from "../contexts/onboarding-context";
import { AuthorizedRoute } from "./authorized-route";
import { UnauthorizedRoute } from "./unauthorized-route";

export const Navigation = () => {
  const { user } = useAuthContext();

  return (
    <OnBoardingContextProvider>
      <NavigationContainer>
        {!user && <UnauthorizedRoute />}
        {user && <AuthorizedRoute />}
      </NavigationContainer>
    </OnBoardingContextProvider>
  );
};
