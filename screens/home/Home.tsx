import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WithDependents } from "../../components/WithDependents";
import { WithoutDependents } from "../../components/WithoutDependents";
import { useDependentContext } from "../../contexts/dependent-context";
import { DependentResource } from "../../hooks/resources/dependent.resource";
import { AuthorizedStack } from "../../routes/authorized-route";

type Props = BottomTabScreenProps<AuthorizedStack, "Home">;

export const Home = ({ navigation }: Props): JSX.Element => {
  const { dependents, listLoading, handleSelectedDependent } =
    useDependentContext();

  const handleDependentPress = (dependent: DependentResource) => {
    navigation.jumpTo("DetailsDependent", {});
    handleSelectedDependent(dependent);
  };

  if (listLoading) {
    return (
      <View style={styles.container}>
        {listLoading && <ActivityIndicator size="large" color={"#758bfc"} />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {dependents?.length === 0 ? (
        <WithoutDependents
          onPress={() => navigation.jumpTo("RegisterDependent", {})}
        />
      ) : (
        <WithDependents
          handleDependentPress={handleDependentPress}
          dependents={dependents!}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#AFB8DB",
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
});
