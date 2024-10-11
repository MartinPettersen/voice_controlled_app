import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
//https://www.npmjs.com/package/expo-speech-recognition
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";
import Dictate from "@/components/(dictation)/Dictate";
import DictateEmail from "@/components/(dictation)/DictateEmail";

const DictateEmailsScreen = () => {
  const [transcript, setTranscript] = useState("");


  return (
    <DictateEmail dictation={transcript} setDictation={setTranscript} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#473B3B",
  },
});

export default DictateEmailsScreen;
