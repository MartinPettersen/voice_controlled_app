import DictateButton from "@/components/(dictation)/DictateButton";
import BlueButton from "@/components/utils/BlueButton";
import OrangeButton from "@/components/utils/OrangeButton";
import { getAllNotes, getNote } from "@/database/database";
import useSpeak from "@/hooks/useSpeak";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";


const NoteScreen = () => {
  const { noteid } = useLocalSearchParams();
  console.log("noteid", noteid)
  const [note, setNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const note = await getNote(parseInt(noteid[0]));
      setNote(note[0]);
      console.log("note", note);
    })();

    const welcomeText =
      "To return to main menu push at the top of the screen.";
    useSpeak(welcomeText);
  }, []);

  const handleFinish = () => {
    router.push("/");
  };

  useEffect(() => {
    if (note) {
        useSpeak(`${note.id} ${note.subject} ${note.content}`);
    }
  }, [note]);

  return (
    <View style={styles.container}>
      <OrangeButton label="Done" action={() => handleFinish()} />

      <ScrollView
        contentContainerStyle={styles.noteContainer}
        style={styles.scrollView}
      >
        {note
          ? 
          
              <View style={styles.noteCard}>
                <Text style={styles.text}>{note.content}</Text>
              </View>
          
          : null}
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
  noteContainer: {
    alignItems: "center",
    backgroundColor: "#473B3B",
    paddingTop: 10,
    width: "100%",
  },
  noteCard: {
    backgroundColor: "#D9D9D9",
    padding: 20,
    marginVertical: 14,
    width: "90%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default NoteScreen;
