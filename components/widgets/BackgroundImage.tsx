import { FC } from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { cn } from "~/lib/utils";

export interface BackgroundImageProps {
  source: ImageSourcePropType;
  className?: string;
}

export const BackgroundImage: FC<BackgroundImageProps> = ({
  source,
  className,
}) => {
  return (
    <View className={cn("absolute top-0 left-0 right-0 bottom-0", className)}>
      <Image source={source} className="w-full h-full" resizeMode="cover" />
    </View>
  );
};
