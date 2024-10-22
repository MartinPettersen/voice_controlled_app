import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
//https://www.npmjs.com/package/expo-speech-recognition
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";
import useSpeak from "@/hooks/useSpeak";
import useDictate from "@/hooks/useDictate";

type Props = {
  dictation: string;
  setDictation: React.Dispatch<React.SetStateAction<string>>;
  setShowDictateCurrent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDictateNext: React.Dispatch<React.SetStateAction<boolean>>;
  voiceMessage: string;
};

const Dictate = ({
  dictation,
  setDictation,
  setShowDictateCurrent,
  setShowDictateNext,
  voiceMessage,
}: Props) => {
  const [recognizingSpeech, setRecognizingSpeech] = useState(false);

  const handleFinish = () => {
    setShowDictateCurrent(false);
    setShowDictateNext(true);
  };

  useEffect(() => {
    useSpeak(voiceMessage);
  }, []);

  useEffect(() => {
    if (!recognizingSpeech && dictation !== "") {
      const response = `you dictated: ${dictation}, if this is not correct, you can try again by pushing at the bottom of the screen`;
      useSpeak(response);
    }
  }, [recognizingSpeech]);

  const { handleStart } = useDictate(setDictation, setRecognizingSpeech, dictation);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <OrangeButton label="Done" action={() => handleFinish()} />

        <View style={styles.textContainer}>
          <Text style={styles.text}>{dictation}</Text>
        </View>
        {!recognizingSpeech ? (
          <BlueButton label="Start" action={handleStart} />
        ) : (
          <BlueButton label="Stop" action={ExpoSpeechRecognitionModule.stop} />
        )}
      </ScrollView>
    </View>
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
  textContainer: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    padding: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Dictate;
