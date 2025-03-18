import { appleBlue, zincColors } from "@/constants/Colors";
import { ReactNode, useMemo } from "react";
import { ViewStyle, TextStyle, useColorScheme, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonVariant = "filled" | "outlined" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const sizeStyles: Record<ButtonSize, { height: number; fontSize: number; padding: number }> = {
  small: { height: 36, fontSize: 14, padding: 12 },
  medium: { height: 44, fontSize: 16, padding: 16 },
  large: { height: 55, fontSize: 18, padding: 20 },
};

export function Button({
  onPress,
  variant = "filled",
  size = "medium",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  //Example using useMemo and testing performance
  const getVariantStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[50] : zincColors[900],
        };
      case "outlined":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? zincColors[700] : zincColors[300],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
    }
  }, [variant, isDark]);

  function getTextColor() {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }
    switch (variant) {
      case "filled":
        return isDark ? zincColors[900] : zincColors[50];
      case "outlined":
      case "ghost":
        return appleBlue;
    }
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle,
        { height: sizeStyles[size].height, paddingHorizontal: sizeStyles[size].padding, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: "700",
            },
            textStyle,
          ])}
        >
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
}
