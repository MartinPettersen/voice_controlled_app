import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
//https://www.npmjs.com/package/expo-speech-recognition
import Dictate from "@/components/(dictation)/Dictate";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";
import useSpeak from "@/hooks/useSpeak";

const DictateEmailsScreen = () => {

  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  const [showDictateEmail, setShowDictateEmail] = useState(true)
  const [showDictateSubject, setShowDictateSubject] = useState(false)
  const [showDictateContent, setShowDictateContent] = useState(false)
  const [isDone, setIsDone] = useState(false)

  return (
    <View>
      {showDictateEmail? 
        <Dictate dictation={email} setDictation={setEmail} setShowDictateCurrent={setShowDictateEmail} setShowDictateNext={setShowDictateSubject} voiceMessage="To start dictating the recievers email, push at the bottom half of the screen. say the email address. When you are done push on the top part of the screen."/>
      : null}
      {showDictateSubject? 
        <Dictate dictation={subject} setDictation={setSubject} setShowDictateCurrent={setShowDictateSubject} setShowDictateNext={setShowDictateContent} voiceMessage="To start dictating the email subject, push at the bottom half of the screen. say the email subject . When you are done push on the top part of the screen."/>
      : null}
      {showDictateContent? 
        <Dictate dictation={content} setDictation={setContent} setShowDictateCurrent={setShowDictateContent} setShowDictateNext={setIsDone} voiceMessage="To start dictating the email content, push at the bottom half of the screen. say the email content. When you are done push on the top part of the screen."/>
      : null}
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
});

export default DictateEmailsScreen;
