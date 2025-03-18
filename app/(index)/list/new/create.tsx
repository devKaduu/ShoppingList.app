import React from "react";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Link, router, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateScreen() {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  function handleCreateList() {}

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Nova lista",
          headerLargeTitle: false,
        }}
      />
      <BodyScrollView style={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Novo Item"
            size="large"
            variant="ghost"
            value={listName}
            onChangeText={setListName}
            returnKeyType="done"
            onSubmitEditing={handleCreateList}
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
          <Link href={{ pathname: "/" }} style={[styles.emojiButton, { borderColor: "blue" }]}>
            <View style={styles.emojiContainer}>
              <Text>{"😆"}</Text>
            </View>
          </Link>

          <Link href={{ pathname: "/" }} style={[styles.emojiButton, { borderColor: "blue" }]}>
            <View style={styles.colorContainer}>
              <View style={{ width: 24, height: 24, borderRadius: 100, backgroundColor: "blue" }} />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Descrição (Opcional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
        />
        <Button onPress={handleCreateList} disabled={!listName} variant="ghost" textStyle={styles.createButtonText}>
          Criar lista
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    // color: appleBlue,
    // fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
