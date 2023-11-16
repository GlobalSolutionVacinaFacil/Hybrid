import { FlatList, StyleSheet, Text, View } from "react-native";
import { DependentItem } from "./DependentItem";
import { DependentResource } from "../hooks/resources/dependent.resource";

interface WithDependentsProps {
  dependents: DependentResource[];
  handleDependentPress: (dependent: DependentResource) => void;
}

export const WithDependents = ({
  dependents,
  handleDependentPress,
}: WithDependentsProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seus dependentes</Text>
      <FlatList<DependentResource>
        data={dependents}
        contentContainerStyle={{ gap: 15 }}
        renderItem={({ item }) => (
          <DependentItem handlePress={handleDependentPress} dependent={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    gap: 15,
    height: "100%",
  },
  text: {
    fontFamily: "PoppinsMedium",
    color: "black",
    fontSize: 20,
  },
});
