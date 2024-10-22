import DictateButton from "@/components/(dictation)/DictateButton";
import BlueButton from "@/components/utils/BlueButton";
import OrangeButton from "@/components/utils/OrangeButton";
import { getAllNotes, getNote } from "@/database/database";
import useSpeak from "@/hooks/useSpeak";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const ReadScreen = () => {
  const [indexer, setIndexer] = useState("");
  const [allNotes, setAllNotes] = useState<any>([]);
  const [selectedNote, setSelectedNote] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const notes = await getAllNotes();
      setAllNotes(notes);
      console.log("all notes", notes);
    })();

    const welcomeText =
      "To return to main menu push at the top of the screen. To read a specific note push the note";
    useSpeak(welcomeText);
  }, []);

  const handleFinish = () => {
    router.push("/");
  };

  const handleNoteSelection = (noteId: string) => {
    router.push({
      pathname: "/NoteScreen",
      params: { noteid: noteId.toString() }
    });
  };

  useEffect(() => {
    if (allNotes.length > 0) {
      for (let i = 0; i < allNotes.length; i++) {
        useSpeak(`${allNotes[i].id} ${allNotes[i].subject}`);
      }
    }
  }, [allNotes]);

  return (
    <View style={styles.container}>
      <OrangeButton label="Done" action={() => handleFinish()} />

      <ScrollView
        contentContainerStyle={styles.noteContainer}
        style={styles.scrollView}
      >
        {allNotes.length > 0
          ? allNotes.map((note: any) => (
              <TouchableOpacity key={note.id} style={styles.noteCard} onPress={() => handleNoteSelection(note.id)}>
                <Text style={styles.text}>{note.subject}</Text>
              </TouchableOpacity>
            ))
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

export default ReadScreen;
