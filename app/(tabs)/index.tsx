import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import useSpeak from "@/hooks/useSpeak";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";
import { router } from "expo-router";


export default function HomeScreen() {
  useEffect(() => {
    const welcomeText =
      "Welcome to this app for people with vision imparement. If you want to read emails click on the upper part of the screen. If you want to dictate emails click on the bottom part of the screen";
    useSpeak(welcomeText);
  }, []);

  const navigateToRead = () => {
    useSpeak("Read Emails")
    router.push('/ReadScreen');
  };

  const navigateToDictate = () => {
    useSpeak("Dictate Emails")
    router.push('/DictateEmailsScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <OrangeButton label="Read Emails" action={() => navigateToRead()}/>
      <BlueButton label="Dictate Emails" action={() => navigateToDictate()}/>
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
