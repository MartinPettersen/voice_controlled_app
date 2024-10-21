import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
//https://www.npmjs.com/package/expo-speech-recognition
// adb emu avd hostmicon
import Dictate from "@/components/(dictation)/Dictate";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import OrangeButton from "@/components/utils/OrangeButton";
import BlueButton from "@/components/utils/BlueButton";
import useSpeak from "@/hooks/useSpeak";
import { addNote, getAllNotes, updateContent, updateSubject } from "@/database/database";
import { router } from "expo-router";

const DictateNoteScreen = () => {

  /*
  (async () => {
    // await createTables();
     
     const d = new Date();
     await addNote(d.toISOString(), "Test note", "This is a test note");
     await updateSubject (43, "Updated note");
     await updateContent (43,  "This is a updated note");
     
     //for (let i = 0; i < 45; i++) {
       
     //  await deleteNote(i)
     //}
 
     const allNotes = await getAllNotes();
     console.log("all notes", allNotes);
 })();
 */


const storeNote = async () => {
  // await createTables();
   
   const d = new Date();
   await addNote(d.toISOString(), subject, content);
   
   const allNotes = await getAllNotes();
   console.log("all notes", allNotes);
   router.push('/');

}


  //const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  //const [showDictateEmail, setShowDictateEmail] = useState(true)
  const [showDictateSubject, setShowDictateSubject] = useState(true)
  const [showDictateContent, setShowDictateContent] = useState(false)
  const [isDone, setIsDone] = useState(false)

 useEffect(() => {

  if (isDone) {
    storeNote()
  }

 },[isDone])

  return (
    <View>
      {showDictateSubject? 
        <Dictate dictation={subject} setDictation={setSubject} setShowDictateCurrent={setShowDictateSubject} setShowDictateNext={setShowDictateContent} voiceMessage="To start dictating the subject, push at the bottom half of the screen. say the subject . When you are done push on the top part of the screen."/>
      : null}
      {showDictateContent? 
        <Dictate dictation={content} setDictation={setContent} setShowDictateCurrent={setShowDictateContent} setShowDictateNext={setIsDone} voiceMessage="To start dictating the content, push at the bottom half of the screen. say the content. When you are done push on the top part of the screen."/>
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

export default DictateNoteScreen;
