import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

import { Alert, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function onSignInPress() {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      Alert.alert(isClerkAPIResponseError(error) ? error.message : "An error occurred");
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        label="Email"
        value={email}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        label="Password"
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={(value) => setPassword(value)}
      />
      <Button onPress={onSignInPress} loading={isSigningIn} disabled={!email || !password || isSigningIn}>
        Sign In
      </Button>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account</ThemedText>
        <Button onPress={() => router.push("/sign-up")} variant="ghost">
          Sign Up
        </Button>
      </View>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button onPress={() => router.push("/reset-password")} variant="ghost">
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}
