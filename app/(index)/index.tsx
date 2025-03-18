import React from "react";

import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();

  function renderHeaderRight() {
    return (
      <Pressable onPress={() => router.push("/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  }

  function renderHeaderLeft() {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Início</ThemedText>
        <Button onPress={signOut}>Sair</Button>
      </BodyScrollView>
    </>
  );
}
