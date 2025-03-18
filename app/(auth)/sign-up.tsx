import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErros] = useState<ClerkAPIError[]>([]);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  async function onSignUpPress() {
    if (!isLoaded) return;
    setIsLoading(true);
    setErros([]);

    try {
      // Start Auth
      await signUp.create({
        emailAddress: email,
        password: password,
        username: userName,
      });
      // Confirmation Code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerifyPress() {
    if (!isLoaded) return;
    setIsLoading(true);
    setErros([]);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(signUpAttempt);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code sent to ${email}`}
          placeholder="Enter your verification code"
          onChangeText={setCode}
        />
        <Button onPress={onVerifyPress} disabled={!code || isLoading} loading={isLoading}>
          Verify
        </Button>

        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput value={userName} placeholder="Enter username" onChangeText={setUserName} autoCapitalize="none" />
      <TextInput
        value={email}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput value={password} placeholder="Enter password" secureTextEntry onChangeText={setPassword} />
      <Button onPress={onSignUpPress} loading={isLoading} disabled={!email || !password || !userName || isLoading}>
        Continue
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red", textAlign: "center", marginTop: 16 }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
