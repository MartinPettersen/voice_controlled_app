import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    label: string,
    action: () => void
}

const OrangeButton = ({label}: Props) => {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    
  button: {
    backgroundColor: "#22EFFC",
    width: "90%",
    height: "45%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FF730E",
    fontSize: 50,
    fontWeight: "bold"
  }
})

export default OrangeButton;
