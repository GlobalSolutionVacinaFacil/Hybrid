import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { useOnboardingContext } from "../../contexts/onboarding-context";
import { UnauthorizedStack } from "../../routes/unauthorized-route";

type Props = StackScreenProps<UnauthorizedStack, "SecondStep">;

export const SecondStep = ({ navigation }: Props): JSX.Element => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const { handleRegister } = useOnboardingContext();

  const handleSubmit = async () => {
    if (!email || !password) return alert("Dados não preenchidos!");
    try {
      await handleRegister(email, password);
      navigation.push("ThirdStep", {});
    } catch (err) {
      console.log(err);
      alert("Ocorreu um erro ao cadastrar sua conta! Tente novamente!");
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().onBoardingText}>
        <Text style={styles().textOne}>Primeiros passos</Text>
        <Text style={styles().textTwo}>Realize seu cadastro</Text>
        <Text style={styles().textThree}>
          Cadastre-se da forma que considere mais fácil
        </Text>
      </View>

      <View style={styles().textInputView}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles().textInput}
          placeholder="nome"
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles().textInput}
          placeholder="email"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles().textInput}
          placeholder="senha"
          secureTextEntry={true}
        />
      </View>

      <View style={styles().stepsView}>
        <View style={styles().stepProgressView}>
          <View style={styles().stepProgress}></View>
          <View style={styles(true).stepProgress}></View>
          <View style={styles().stepProgress}></View>
        </View>

        <Pressable style={styles().pressable} onPress={() => handleSubmit()}>
          <Text style={styles().pressableText}>Realizar cadastro</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const styles = (isStep?: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#AFB8DB",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },

    onBoardingText: {
      gap: 15,
      width: "100%",
      position: "absolute",
      alignItems: "center",
      top: 200,
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

    pressable: {
      backgroundColor: "#758bfc",
      width: "80%",
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

    stepsView: {
      gap: 15,
      width: "100%",
      position: "absolute",
      alignItems: "center",
      bottom: 70,
    },

    stepProgressView: {
      gap: 5,
      flexDirection: "row",
      alignItems: "center",
    },

    stepProgress: {
      width: isStep != undefined ? 30 : 10,
      height: isStep != undefined ? 10 : 7,
      borderRadius: 10,
      backgroundColor: isStep != undefined ? "#758bfc" : "gray",
    },
  });
};
