import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export default function ResetPassword() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErros] = useState<ClerkAPIError[]>([]);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onResetPasswordPress = useCallback(async () => {
    if (!isLoaded) return;
    setErros([]);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setPendingVerification(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErros(error.errors);
      }
      console.log(error);
    }
  }, [isLoaded, email, signIn]);

  const onVerifyPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/");
      } else {
        console.log(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErros(error.errors);
      }
      console.log(JSON.stringify(error, null, 2));
    }
  }, [isLoaded, code, password, signIn, setActive, router]);

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${email}`}
          placeholder="Enter your verification code"
          keyboardType="number-pad"
          onChangeText={setCode}
        />
        <TextInput
          value={password}
          label={"Enter your new password"}
          placeholder="Enter your new password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button onPress={onVerifyPress} disabled={!code || !password}>
          Reset Password
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
      <TextInput
        value={email}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <Button onPress={onResetPasswordPress} loading={isLoading} disabled={!email}>
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
