import { Pressable, StyleSheet, Text, Image, View } from "react-native";

interface WithoutDependentsProps {
  onPress: () => void;
}

export const WithoutDependents = ({
  onPress,
}: WithoutDependentsProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/home/noDependents.png")}
      />
      <Text style={styles.text}>Nenhum dependente cadastrado</Text>
      <Pressable style={styles.pressable} onPress={() => onPress()}>
        <Text style={styles.pressableText}>Leve-me até lá</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontFamily: "PoppinsMedium",
    color: "black",
    fontSize: 18,
    marginBottom: 10,
  },

  image: {
    height: 250,
    objectFit: "contain",
  },

  pressable: {
    backgroundColor: "#758bfc",
    width: "85%",
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
