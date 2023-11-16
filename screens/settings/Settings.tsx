import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Userpic } from "react-native-userpic";
import { useAuthContext } from "../../contexts/auth-context";
import { useDependentContext } from "../../contexts/dependent-context";
import { AuthorizedStack } from "../../routes/authorized-route";

type Props = BottomTabScreenProps<AuthorizedStack, "Settings">;

export const Settings = ({ navigation }: Props): JSX.Element => {
  const { user, handleSignout } = useAuthContext();
  const { dependents } = useDependentContext();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Userpic name={user?.email!} radius={50} size={90} />
        <Text style={styles.textOne}>{user?.email!}</Text>
        <Text style={styles.textThree}>
          {dependents?.length}{" "}
          {dependents?.length === 1 ? "dependente" : "dependentes"}
        </Text>

        <Image
          style={styles.image}
          source={require("../../assets/profile/heart.png")}
        />
      </View>

      <View style={styles.pressableView}>
        <Pressable
          style={styles.deletePressable}
          onPress={() => handleSignout()}
        >
          <Text style={styles.deletePressableText}>Encerrar sessão</Text>
        </Pressable>

        <Pressable
          style={styles.createPressable}
          onPress={() => navigation.jumpTo("RegisterDependent", {})}
        >
          <Text style={styles.createPressableText}>Cadastrar dependente</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingTop: 20,
  },

  image: {
    height: 250,
    opacity: 0.5,
    objectFit: "contain",
  },

  container: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },

  textOne: {
    fontFamily: "PoppinsMedium",
    color: "black",
    fontSize: 25,
    margin: 10,
  },

  textTwo: {
    fontFamily: "PoppinsLight",
    color: "black",
    fontSize: 16,
  },

  textThree: {
    fontFamily: "PoppinsLight",
    color: "black",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },

  pressableView: {
    position: "absolute",
    bottom: 50,
    gap: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  createPressable: {
    backgroundColor: "#758bfc",
    width: "80%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  deletePressable: {
    width: "80%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },

  createPressableText: {
    color: "white",
    fontFamily: "PoppinsMedium",
  },

  deletePressableText: {
    color: "red",
    fontFamily: "PoppinsMedium",
  },
});
