import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "~/lib/utils";

const TextClassContext = React.createContext<string | undefined>(undefined);

interface CustomTextProps extends SlottableTextProps {
  font?:
    | "Manrope_200ExtraLight"
    | "Manrope_300Light"
    | "Manrope_400Regular"
    | "Manrope_500Medium"
    | "Manrope_600SemiBold"
    | "Manrope_700Bold"
    | "Manrope_800ExtraBold";
}

const Text = React.forwardRef<TextRef, CustomTextProps>(
  (
    {
      className,
      font = "Manrope_400Regular",
      asChild = false,
      style,
      ...props
    },
    ref
  ) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;

    return (
      <Component
        className={cn(
          "text-base text-foreground web:select-text",
          textClass,
          className
        )}
        ref={ref}
        style={[{ fontFamily: font }, style]}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, TextClassContext };
