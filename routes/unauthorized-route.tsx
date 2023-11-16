import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/login/Login";
import { FirstStep } from "../screens/onboarding/FirstStep";
import { SecondStep } from "../screens/onboarding/SecondStep";
import { ThirdStep } from "../screens/onboarding/ThirdStep";
import { NavigationContainer } from "@react-navigation/native";

export type UnauthorizedStack = {
  Login: {};
  FirstStep: {};
  SecondStep: {};
  ThirdStep: {};
};

const { Navigator, Screen } = createStackNavigator<UnauthorizedStack>();

export const UnauthorizedRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="FirstStep" component={FirstStep} />
      <Screen name="SecondStep" component={SecondStep} />
      <Screen name="ThirdStep" component={ThirdStep} />
    </Navigator>
  );
};
