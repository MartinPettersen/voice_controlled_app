import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    label: string,
    action: () => void
}

const OrangeButton = ({label, action}: Props) => {
  return (
    <TouchableOpacity onPress={action}  style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
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
