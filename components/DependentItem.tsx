import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { DependentResource } from "../hooks/resources/dependent.resource";

interface DependentItemProps {
  dependent: DependentResource;
  handlePress: (dependent: DependentResource) => void;
}

export const DependentItem = ({
  dependent,
  handlePress,
}: DependentItemProps): JSX.Element => {
  return (
    <TouchableNativeFeedback onPress={() => handlePress(dependent)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/home/dependentImage.png")}
        />
        <View>
          <Text style={styles.textOne}>{dependent.name}</Text>
          <Text style={styles.textTwo}>
            {dependent.birthday.toLocaleDateString("pt-br")}
          </Text>
          <Text style={styles.textThree}>Calendário disponível</Text>
        </View>

        <Icon
          name="chevron-right"
          size={20}
          style={{ position: "absolute", right: 20 }}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#758bfc",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    height: 100,
    width: 100,
    objectFit: "contain",
  },

  textOne: {
    fontFamily: "PoppinsMedium",
    color: "black",
    fontSize: 20,
  },

  textTwo: {
    fontFamily: "PoppinsLight",
    color: "black",
    fontSize: 14,
  },

  textThree: {
    fontFamily: "PoppinsLight",
    fontSize: 14,
  },
});
