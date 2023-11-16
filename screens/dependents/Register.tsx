import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDependentContext } from "../../contexts/dependent-context";
import { AuthorizedStack } from "../../routes/authorized-route";

type Props = BottomTabScreenProps<AuthorizedStack, "RegisterDependent">;

export const RegisterDependent = ({ navigation }: Props): JSX.Element => {
  const [name, setName] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { handleCreate } = useDependentContext();

  const handleSubmit = async () => {
    if (!name || !date) return alert("Estão faltando dados!");
    try {
      handleCreate(name, date);
      alert("Criado com sucesso!");
      navigation.jumpTo("Home", {});
    } catch (err) {
      console.log(err);
      alert("Ocorreu um erro ao cadastrar sua conta! Tente novamente!");
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().onBoardingText}>
        <Text style={styles().textOne}>Dependentes</Text>
        <Text style={styles().textTwo}>Cadastre seu filho</Text>
        <Text style={styles().textThree}>
          Insira os dados corretamente para resultados melhores
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
          value={date ? date!.toLocaleDateString("pt-br") : undefined}
          style={styles().textInput}
          keyboardType="numeric"
          onPressIn={() => setIsVisible(true)}
          placeholder="data de nascimento"
        />
      </View>
      <DateTimePickerModal
        minimumDate={new Date("2006-1-2")}
        onConfirm={(date) => {
          setDate(date);
          setIsVisible(false);
        }}
        onCancel={() => setIsVisible(false)}
        isVisible={isVisible}
        mode="date"
      />

      <Pressable
        style={styles().pressable}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles().pressableText}>Realizar cadastro</Text>
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
      paddingTop: "30%",
      width: "100%",
      alignItems: "center",
      gap: 14,
    },

    dateInput: {
      backgroundColor: "#ffffff",
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      borderRadius: 10,
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
