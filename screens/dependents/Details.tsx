import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Userpic } from "react-native-userpic";
import { useAuthContext } from "../../contexts/auth-context";
import { useDependentContext } from "../../contexts/dependent-context";
import { AuthorizedStack } from "../../routes/authorized-route";

type Props = BottomTabScreenProps<AuthorizedStack, "DetailsDependent">;

export const Details = ({ navigation }: Props): JSX.Element => {
  const { user } = useAuthContext();
  const { selectedDependent, handleDelete, handleUpdate } =
    useDependentContext();

  const [name, setName] = useState<string>(selectedDependent?.name!);
  const [birthday, setBirthday] = useState<Date>(selectedDependent?.birthday!);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleEdition = () => setIsEditing(!isEditing);

  const handleDependentDeletion = async () => {
    try {
      await handleDelete();
      alert("Deletado com sucesso!");
      navigation.jumpTo("Home", {});
    } catch (err) {
      alert("Ocorreu um erro");
    }
  };

  const handleSubmit = async () => {
    try {
      await handleUpdate(name, birthday);
      setIsEditing(false);
      navigation.jumpTo("Home", {});
    } catch (err) {
      console.log(err);
      setIsEditing(false);
      alert("Ocorreu um erro atualizar o dependente");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Userpic name={selectedDependent?.name} radius={50} size={90} />
        {isEditing ? (
          <>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.textInput}
              placeholder="nome"
            />
            <TextInput
              value={
                birthday ? birthday!.toLocaleDateString("pt-br") : undefined
              }
              style={styles.textInput}
              keyboardType="numeric"
              onPressIn={() => setIsVisible(true)}
              placeholder="data de nascimento"
            />
            <DateTimePickerModal
              minimumDate={new Date("2006-1-2")}
              onConfirm={(date) => {
                setBirthday(date);
                setIsVisible(false);
              }}
              onCancel={() => setIsVisible(false)}
              isVisible={isVisible}
              mode="date"
            />
          </>
        ) : (
          <>
            <Text style={styles.textOne}>{selectedDependent?.name}</Text>
            <Text style={styles.textThree}>
              {selectedDependent?.birthday.toLocaleDateString("pt-br")}
            </Text>
          </>
        )}

        <View style={styles.containerView}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("opa");
              Linking.openURL(
                "https://www.saude.ce.gov.br/wp-content/uploads/sites/9/2020/07/calendario_vacinacao_2023.pdf"
              );
            }}
          >
            <>
              <Image
                style={styles.image}
                source={require("../../assets/details/calendar.png")}
              />
              <Text style={styles.textTwo}>Calendário de vacinação</Text>
            </>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.pressableView}>
        <Pressable
          style={styles.deletePressable}
          onPress={() => handleDependentDeletion()}
        >
          <Text style={styles.deletePressableText}>Deletar dependente</Text>
        </Pressable>
        <Pressable
          style={styles.createPressable}
          onPress={() => {
            if (!isEditing) return handleEdition();
            handleSubmit();
          }}
        >
          <Text style={styles.createPressableText}>
            {isEditing ? "Salvar" : "Editar dependente"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingTop: 20,
    backgroundColor: "#AFB8DB",
  },

  image: {
    height: 150,
    width: 150,
    opacity: 0.5,
    objectFit: "contain",
  },

  container: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },

  textInput: {
    backgroundColor: "#ffffff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    margin: 10,
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
    fontSize: 16,
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

  containerView: {
    backgroundColor: "#758bfc",
    marginTop: 50,
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
});
