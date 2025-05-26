import { View } from "react-native";
import { FC, ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Text } from "../ui";

interface IntroductionProps {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export const Introduction: FC<IntroductionProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <View className={cn("max-w-[251px] mx-auto flex-col gap-4", className)}>
      {title && <Text className="text-center text-2xl font-bold">{title}</Text>}
      {description && (
        <Text className="text-center text-lg text-gray-500">{description}</Text>
      )}
      {children}
    </View>
  );
};
