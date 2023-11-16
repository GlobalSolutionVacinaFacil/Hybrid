import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { Navigation } from "./routes/navigation";
import { AuthContextProvider } from "./contexts/auth-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
  });

  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
