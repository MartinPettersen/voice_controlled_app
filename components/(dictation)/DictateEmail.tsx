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

type Props = {
  dictation: string;
  setDictation: React.Dispatch<React.SetStateAction<string>>;
  setShowDictateEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDictateSubject: React.Dispatch<React.SetStateAction<boolean>>;
};

const DictateEmail = ({
  dictation,
  setDictation,
  setShowDictateEmail,
  setShowDictateSubject,
}: Props) => {
  const [recognizingSpeech, setRecognizingSpeech] = useState(false);

  useSpeechRecognitionEvent("start", () => setRecognizingSpeech(true));
  useSpeechRecognitionEvent("end", () => setRecognizingSpeech(false));
  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript;
    const atTranscript = transcript.replace(" at ", "@");

    setDictation(atTranscript);
    //useSpeak(atTranscript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error", event.error, "error ", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.log("need permission to use microphone", result);
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  };

  const handleFinish = () => {
    setShowDictateEmail(false);
    setShowDictateSubject(true);
  };

  useEffect(() => {
    useSpeak("To start dictating the recievers email, push at the bottom half of the screen. say the email address. When you are done push on the top part of the screen.")
  },[])

  useEffect(() => {
    if (!recognizingSpeech && dictation !== "") {
      const response = `you dictated: ${dictation}, if this is not correct, you can try again by pushing at the bottom of the screen`
      useSpeak(response)
    }
  },[recognizingSpeech])

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

export default DictateEmail;
