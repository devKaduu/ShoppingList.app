import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { IconCircle } from "@/components/IconCircle";
import { StyleSheet, View } from "react-native";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Href, useRouter } from "expo-router";
import { isValidUUID } from "@/utils/isValidUuid";

export default function NewListScreen() {
  const [listId, setListId] = useState("");
  const router = useRouter();

  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  const randomEmoji = useMemo(() => emojies[Math.floor(Math.random() * emojies.length)], []);
  const randomColor = useMemo(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)], []);

  function joinShoppingListCallBack(listId: string) {}

  function handleJoinList() {}

  function handleDismissTo(screen: Href) {
    if (router.canDismiss()) {
      router.dismiss();

      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16, gap: 32 }}>
      <View style={styles.container}>
        <IconCircle emoji={randomEmoji} backgroundColor={randomColor} style={styles.icon} size={60} />
        <ThemedText type="title">Melhores juntos</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitle}>
          Crie uma lista de compras compartilhada e colabore em tempo real com seus amigos
        </ThemedText>
      </View>

      <View style={{ gap: 16 }}>
        <Button onPress={() => handleDismissTo("/list/new/create")}>Criar nova lista</Button>

        <View style={styles.separator}>
          <View style={styles.line} />
          <ThemedText style={styles.textSeparator}>ou se juntar a uma</ThemedText>
          <View style={styles.line} />
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <TextInput
          placeholder="Digite um código de lista"
          value={listId}
          onChangeText={setListId}
          containerStyle={{ marginBottom: 0 }}
          onSubmitEditing={(e) => joinShoppingListCallBack(e.nativeEvent.text)}
        />
        <Button onPress={handleJoinList} disabled={!isValidListId}>
          Entrar na Lista
        </Button>
        <Button variant="ghost" onPress={() => handleDismissTo("/list/new/scan")}>
          Scan QR code
        </Button>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  icon: {
    marginBottom: 8,
  },
  subtitle: {
    color: "gray",
    textAlign: "center",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textSeparator: {
    color: "gray",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2))",
  },
});
