/*

RM 93038	Breno Massa Martins
RM 94280	Gustavo Henrique Moura 
RM 95224	Leonard Karic Klovrza
RM 94898	Luan Santos dos Reis

*/

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
