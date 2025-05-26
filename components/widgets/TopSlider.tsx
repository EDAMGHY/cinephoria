import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, Text } from "../ui";
import { cn } from "~/lib/utils";

export interface TopSliderProps {
  title: string;
  urlTitle?: string;
  className?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const TopSlider = ({
  title,
  urlTitle = "View All",
  onPress,
  className,
}: TopSliderProps) => {
  return (
    <View
      className={cn(
        "px-4 pb-3 flex-row justify-between items-center",
        className
      )}
    >
      <Text
        font="Manrope_700Bold"
        className="text-foreground text-lg font-bold"
      >
        {title}
      </Text>
      <Button size="custom" variant="link" className="!py-0" onPress={onPress}>
        <Text className="dark:text-gray-400 text-gray-600 !text-base">
          {urlTitle}
        </Text>
      </Button>
    </View>
  );
};
