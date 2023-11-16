import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { UnauthorizedStack } from "../../routes/unauthorized-route";

type Props = StackScreenProps<UnauthorizedStack, "FirstStep">;

export const FirstStep = ({ navigation }: Props): JSX.Element => {
  return (
    <View style={styles().container}>
      <Image
        style={styles().image}
        source={require("../../assets/onboarding/vaccine.png")}
      />
      <Text style={styles().textOne}>Primeiros passos</Text>
      <Text style={styles().textTwo}>Calendário de vacinação</Text>
      <Text style={styles().textThree}>
        Logo menos você terá o caléndario de vacinação de seu filho
      </Text>
      <View style={styles().stepsView}>
        <View style={styles().stepProgressView}>
          <View style={styles(true).stepProgress}></View>
          <View style={styles().stepProgress}></View>
          <View style={styles().stepProgress}></View>
        </View>

        <Pressable
          style={styles().pressable}
          onPress={() => navigation.push("SecondStep", {})}
        >
          <Text style={styles().pressableText}>Vamos começar </Text>
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
      paddingTop: "20%",
      justifyContent: "flex-start",
      gap: 10,
    },

    image: {
      height: 350,
      objectFit: "contain",
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
