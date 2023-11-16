import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { DependentContextProvider } from "../contexts/dependent-context";
import { RegisterDependent } from "../screens/dependents/Register";
import { Home } from "../screens/home/Home";
import { Settings } from "../screens/settings/Settings";
import { Details } from "../screens/dependents/Details";
import { DependentResource } from "../hooks/resources/dependent.resource";

export type AuthorizedStack = {
  Home: {};
  Settings: {};
  RegisterDependent: {};
  DetailsDependent: {};
};

const { Navigator, Screen } = createBottomTabNavigator<AuthorizedStack>();

export const AuthorizedRoute = () => {
  return (
    <DependentContextProvider>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#758bfc",
            alignContent: "center",
          },
        }}
      >
        <Screen
          options={{ tabBarIcon: () => <Icon name="home" size={20} /> }}
          name="Home"
          component={Home}
        />
        <Screen
          options={{ tabBarIcon: () => <Icon name="settings" size={20} /> }}
          name="Settings"
          component={Settings}
        />
        <Screen
          name="RegisterDependent"
          options={{ tabBarShowLabel: false, tabBarButton: () => null }}
          component={RegisterDependent}
        />
        <Screen
          name="DetailsDependent"
          options={{ tabBarShowLabel: false, tabBarButton: () => null }}
          component={Details}
        />
      </Navigator>
    </DependentContextProvider>
  );
};
