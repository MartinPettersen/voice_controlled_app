import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
//https://www.npmjs.com/package/expo-speech-recognition
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";

type Props = {
    dictation: string,
    setDictation: React.Dispatch<React.SetStateAction<string>>
}

const DictateEmail = ({dictation, setDictation}: Props) => {
  const [recognizingSpeech, setRecognizingSpeech] = useState(false);
  // const [dictation, setDictation] = useState("");

  useSpeechRecognitionEvent("start", () => setRecognizingSpeech(true));
  useSpeechRecognitionEvent("end", () => setRecognizingSpeech(false));
  useSpeechRecognitionEvent("result", (event) => {
    // replace ' at ' med @
    // fjerne mellmorom

    const transcript = event.results[0]?.transcript;
    const atTranscript = transcript.replace(" at ", "@");
    // const dotTranscript = atTranscript.replace(" dot ", ".");
    //const newTranscript = dotTranscript.replace(" ", "");

    setDictation(atTranscript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error", event.error, "error ", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if(!result.granted) {
        console.log("need permission to use microphone", result)
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
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <OrangeButton label="Done" action={() => console.log("back")} />

        <View style={styles.textContainer}>
          <Text style={styles.text}>{dictation}</Text>
          <Text>fjerne mellom rom og erstate at med @</Text>
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
  }
});


export default DictateEmail;
