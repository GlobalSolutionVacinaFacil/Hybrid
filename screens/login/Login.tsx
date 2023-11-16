import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { UnauthorizedStack } from "../../routes/unauthorized-route";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/auth-context";

type Props = StackScreenProps<UnauthorizedStack, "Login">;

export const Login = ({ navigation }: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { handleLogin, user } = useAuthContext();

  const handleSubmit = async () => {
    if (!email || !password) return alert("Dados não preenchidos!");
    try {
      setLoading(true);
      await handleLogin(email, password);
      setLoading(false);
    } catch (erro) {
      alert("Ocorreu um erro ao entrar! Tente novamente!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <View style={styles().container}>
      <Image
        style={styles().image}
        source={require("../../assets/onboarding/vaccine.png")}
      />
      <View style={styles().onBoardingText}>
        <Text style={styles().textOne}>Entrada</Text>
        <Text style={styles().textTwo}>Realize seu login</Text>
        <Text style={styles().textThree}>Seja bem-vindo novamente</Text>
      </View>

      <View style={styles().textInputView}>
        <TextInput
          style={styles().textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="email"
        />
        <TextInput
          style={styles().textInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="senha"
        />
        <Pressable
          style={styles().registerPressable}
          onPress={() => navigation.push("FirstStep", {})}
        >
          <Text style={styles().registerPressableText}>Quero me cadastrar</Text>
        </Pressable>
      </View>

      <Pressable
        disabled={loading}
        style={styles().pressable}
        onPress={() => handleSubmit()}
      >
        <Text style={styles().pressableText}>Entrar</Text>
      </Pressable>
    </View>
  );
};

export const styles = (isStep?: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#AFB8DB",
      height: "100%",
      alignItems: "center",
      paddingTop: "15%",
    },

    image: {
      height: 250,
      objectFit: "contain",
    },

    onBoardingText: {
      gap: 5,
      width: "100%",
      alignItems: "center",
    },

    textInputView: {
      paddingTop: "10%",
      width: "100%",
      alignItems: "center",
      gap: 14,
    },

    textInput: {
      backgroundColor: "#ffffff",
      width: "90%",
      padding: 15,
      borderRadius: 10,
    },

    textOne: {
      fontFamily: "PoppinsMedium",
      color: "black",
      fontSize: 14,
    },

    textTwo: {
      fontFamily: "PoppinsMedium",
      color: "black",
      fontSize: 20,
    },

    textThree: {
      fontFamily: "PoppinsLight",
      color: "black",
      textAlign: "center",
      width: "85%",
      fontSize: 14,
    },
    registerPressable: {
      width: "90%",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 20,
    },

    registerPressableText: {
      color: "#758bfc",
      fontFamily: "PoppinsMedium",
    },

    pressable: {
      position: "absolute",
      bottom: 100,
      backgroundColor: "#758bfc",
      width: "90%",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 20,
    },

    pressableText: {
      color: "white",
      fontFamily: "PoppinsMedium",
    },
  });
};
