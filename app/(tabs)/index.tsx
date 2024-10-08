import { Image, StyleSheet, Platform, View, Text } from "react-native";
import * as Speech from "expo-speech";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import useSpeak from "@/hooks/useSpeak";

export default function HomeScreen() {
  useEffect(() => {
    const welcomeText =
      "Welcome to this app for people with vision imparement. If you want to read emails click on the upper part of the screen. If you want to dictate emails click on the bottom part of the screen";

    useSpeak(welcomeText);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.orangeButton}>
        <Text style={styles.text}>Test</Text>
      </View>
      <View style={styles.orangeButton}>
        <Text style={styles.text}>Test</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%"
  },
  text: {
    color: "white",
  },
  orangeButton: {
    backgroundColor: "#FF730E",
    width: "90%",
    height: "45%",
    borderRadius: 10,
    
  },
});
