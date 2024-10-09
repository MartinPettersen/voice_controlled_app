import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    label: string,
    action: () => void
}

const OrangeButton = ({label, action}: Props) => {
  return (
    <TouchableOpacity onPress={action}  style={styles.orangeButton} >
      <Text style={styles.blueText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    
  orangeButton: {
    backgroundColor: "#FF730E",
    width: "90%",
    height: "45%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  blueText: {
    color: "#22EFFC",
    fontSize: 50,
    fontWeight: "bold"
  }
})

export default OrangeButton;
