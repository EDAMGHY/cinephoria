import { useRouter } from "expo-router";
import React from "react";
import { Button, Text } from "../ui";
import { ArrowLeft } from "iconsax-react-nativejs";
import { Image, View } from "react-native";

export const TopHeader = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const onPress = () => {
    onBack();
    router?.canGoBack?.() ? router.back() : router.replace("/registerlogin");
  };

  return (
    <>
      <Button
        variant="link"
        className="self-start absolute top-20 left-4"
        onPress={onPress}
        size={"custom"}
      >
        <ArrowLeft color="#fff" size={24}></ArrowLeft>
      </Button>

      <View className="absolute left-1/2 -translate-x-1/2 top-20 flex-row justify-center items-center gap-2">
        <Image
          source={require("~/assets/images/mini-logo.png")}
          className="w-[24px] aspect-square"
          resizeMode="cover"
        />
        <Text className="text-white text-lg font-bold"> Cinephoria</Text>
      </View>
    </>
  );
};
