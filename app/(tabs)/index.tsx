import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import useSpeak from "@/hooks/useSpeak";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";
import { router } from "expo-router";
import { addNote, createTables, deleteNote, getAllNotes, updateContent, updateSubject } from "@/database/database";


export default function HomeScreen() {

  useEffect(() => {
    const welcomeText =
      "Welcome to this Note taking app for people with vision imparement. If you want to read note's click on the upper part of the screen. If you want to dictate a note click on the bottom part of the screen";
    useSpeak(welcomeText);
  }, []);

  const navigateToRead = () => {
    useSpeak("Read Notes")
    router.push('/ReadScreen');
  };

  const navigateToDictate = () => {
    // useSpeak("You are now entering Dictate Notes")
    router.push('/DictateNoteScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <OrangeButton label="Read Notes" action={() => navigateToRead()}/>
      <BlueButton label="Dictate Note" action={() => navigateToDictate()}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#473B3B"
  },
  text: {
    color: "white",
  },
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
});
